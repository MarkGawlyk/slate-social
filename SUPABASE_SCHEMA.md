# Supabase Database Schema

This document outlines the database structure for Slate Social's news feed, rooms, and groups features.

## Tables

### gyms
Stores information about climbing gyms in the system.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique gym identifier |
| name | text | NOT NULL | Gym name |
| slug | text | UNIQUE, NOT NULL | URL-friendly gym identifier |
| description | text | | Gym description |
| logo_url | text | | URL to gym logo image |
| created_at | timestamptz | DEFAULT now() | Record creation timestamp |
| updated_at | timestamptz | DEFAULT now() | Record update timestamp |

**Indexes:**
- `idx_gyms_slug` on `slug`

---

### rooms
Stores rooms (announcement/message areas) within gyms.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique room identifier |
| gym_id | uuid | FOREIGN KEY REFERENCES gyms(id) ON DELETE CASCADE, NOT NULL | Associated gym |
| name | text | NOT NULL | Room name (e.g., "General Announcements", "Route Updates") |
| description | text | | Room description |
| room_type | text | NOT NULL, DEFAULT 'announcement' | Type: 'announcement', 'discussion', 'news' |
| icon | text | | Emoji or icon identifier |
| display_order | integer | DEFAULT 0 | Sort order for display |
| is_active | boolean | DEFAULT true | Whether room is currently active |
| created_at | timestamptz | DEFAULT now() | Record creation timestamp |
| updated_at | timestamptz | DEFAULT now() | Record update timestamp |

**Indexes:**
- `idx_rooms_gym_id` on `gym_id`
- `idx_rooms_gym_display` on `(gym_id, display_order)`

**Constraints:**
- `UNIQUE(gym_id, name)` - Room names must be unique within a gym

---

### groups
Stores groups (chat rooms) within gyms.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique group identifier |
| gym_id | uuid | FOREIGN KEY REFERENCES gyms(id) ON DELETE CASCADE, NOT NULL | Associated gym |
| name | text | NOT NULL | Group name (e.g., "Beginner's Corner", "Competition Team") |
| description | text | | Group description |
| icon | text | | Emoji or icon identifier |
| is_private | boolean | DEFAULT false | Whether group requires approval to join |
| member_count | integer | DEFAULT 0 | Number of members (cached) |
| created_by | uuid | | User who created the group |
| created_at | timestamptz | DEFAULT now() | Record creation timestamp |
| updated_at | timestamptz | DEFAULT now() | Record update timestamp |

**Indexes:**
- `idx_groups_gym_id` on `gym_id`
- `idx_groups_created_by` on `created_by`

**Constraints:**
- `UNIQUE(gym_id, name)` - Group names must be unique within a gym

---

### posts
Stores posts/messages in rooms and groups.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique post identifier |
| gym_id | uuid | FOREIGN KEY REFERENCES gyms(id) ON DELETE CASCADE, NOT NULL | Associated gym |
| room_id | uuid | FOREIGN KEY REFERENCES rooms(id) ON DELETE CASCADE | Associated room (if room post) |
| group_id | uuid | FOREIGN KEY REFERENCES groups(id) ON DELETE CASCADE | Associated group (if group post) |
| parent_id | uuid | FOREIGN KEY REFERENCES posts(id) ON DELETE CASCADE | Parent post ID for replies/comments |
| author_id | uuid | NOT NULL | User who created the post |
| author_name | text | NOT NULL | Cached author name for display |
| content | text | NOT NULL | Post content |
| media_urls | jsonb | DEFAULT '[]' | Array of media URLs (images, videos) |
| is_pinned | boolean | DEFAULT false | Whether post is pinned to top |
| is_announcement | boolean | DEFAULT false | Whether post is an official announcement |
| reply_count | integer | DEFAULT 0 | Number of replies (cached) |
| like_count | integer | DEFAULT 0 | Number of likes (cached) |
| created_at | timestamptz | DEFAULT now() | Record creation timestamp |
| updated_at | timestamptz | DEFAULT now() | Record update timestamp |
| edited_at | timestamptz | | Last edit timestamp |

**Indexes:**
- `idx_posts_gym_id` on `gym_id`
- `idx_posts_room_id` on `room_id`
- `idx_posts_group_id` on `group_id`
- `idx_posts_author_id` on `author_id`
- `idx_posts_created_at` on `created_at DESC`

**Constraints:**
- `CHECK (room_id IS NOT NULL OR group_id IS NOT NULL)` - Post must belong to either a room or group
- `CHECK (room_id IS NULL OR group_id IS NULL)` - Post cannot belong to both room and group

---

### group_members
Stores membership relationships between users and groups.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique membership identifier |
| group_id | uuid | FOREIGN KEY REFERENCES groups(id) ON DELETE CASCADE, NOT NULL | Associated group |
| user_id | uuid | NOT NULL | Member user ID |
| role | text | DEFAULT 'member' | Member role: 'admin', 'moderator', 'member' |
| joined_at | timestamptz | DEFAULT now() | When user joined the group |

**Indexes:**
- `idx_group_members_group_id` on `group_id`
- `idx_group_members_user_id` on `user_id`

**Constraints:**
- `UNIQUE(group_id, user_id)` - User can only be member of group once

---

## Relationships

```
gyms (1) ──< (many) rooms
gyms (1) ──< (many) groups
gyms (1) ──< (many) posts

rooms (1) ──< (many) posts
groups (1) ──< (many) posts
groups (1) ──< (many) group_members
```

## Row Level Security (RLS) Recommendations

### gyms
- `SELECT`: Public (anyone can view gyms)
- `INSERT/UPDATE/DELETE`: Admin only

### rooms
- `SELECT`: Public for active rooms within user's gym
- `INSERT/UPDATE/DELETE`: Gym staff/admin only

### groups
- `SELECT`: Public for public groups; members only for private groups
- `INSERT`: Authenticated users
- `UPDATE/DELETE`: Group admins and gym staff

### posts
- `SELECT`: 
  - Room posts: Anyone in the gym
  - Group posts: Group members only
- `INSERT`: Authenticated users (with appropriate room/group access)
- `UPDATE/DELETE`: Post author and gym staff/moderators

### group_members
- `SELECT`: Group members can see other members
- `INSERT`: User joining group (approval logic needed for private groups)
- `DELETE`: User leaving group or group admin removing member

## Sample Queries

### Get all rooms for a gym
```sql
SELECT * FROM rooms 
WHERE gym_id = $1 AND is_active = true 
ORDER BY display_order, name;
```

### Get all groups for a gym
```sql
SELECT g.*, 
  (SELECT COUNT(*) FROM group_members WHERE group_id = g.id) as member_count
FROM groups g 
WHERE g.gym_id = $1 
ORDER BY g.name;
```

### Get posts for a room with pagination
```sql
SELECT p.*, 
  COUNT(DISTINCT r.id) as reply_count 
FROM posts p 
LEFT JOIN posts r ON r.parent_id = p.id 
WHERE p.room_id = $1 AND p.parent_id IS NULL
GROUP BY p.id 
ORDER BY p.is_pinned DESC, p.created_at DESC 
LIMIT $2 OFFSET $3;
```

### Get posts for a group
```sql
SELECT p.*
FROM posts p
INNER JOIN group_members gm ON gm.group_id = p.group_id AND gm.user_id = $2
WHERE p.group_id = $1
ORDER BY p.is_pinned DESC, p.created_at DESC
LIMIT $3 OFFSET $4;
```

## Migration Notes

1. Enable UUID extension: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
2. Create tables in order: gyms → rooms, groups → posts, group_members
3. Set up RLS policies after table creation
4. Create indexes for performance
5. Add trigger for updated_at timestamp updates
6. Seed initial data for demo gyms and default rooms
