export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  blurb?: string;
  interests?: string;
};

export type Comment = {
  id: string;
  text: string;
  authorId: string;
  createdAt: string;
};

export type Post = {
  id: string;
  authorId: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  expiresAt: string | null; // null means it never expires
  likes: string[];
  comments: Comment[];
};

export type Circle = {
  id: string;
  name: string;
  members: string[];
  posts: Post[];
};

const users: User[] = [
  { id: '1', name: 'You', avatarUrl: 'https://picsum.photos/seed/user0/200/200', blurb: "Just a user trying to make some friends.", interests: 'hiking, photography, coding' },
];

export function getUsers(): User[] {
    return users;
}

export function getUser(id: string): User | undefined {
  return users.find(u => u.id === id);
}
