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

export const users: User[] = [
  { id: '1', name: 'You', avatarUrl: 'https://picsum.photos/seed/user0/200/200', blurb: "Just a user trying to make some friends.", interests: 'hiking, photography, coding' },
  { id: '2', name: 'Alex Doe', avatarUrl: 'https://picsum.photos/seed/user2/200/200', blurb: 'Lover of coffee and code.' },
  { id: '3', name: 'Emily Smith', avatarUrl: 'https://picsum.photos/seed/user3/200/200', blurb: 'Seeking adventures and good food.' },
  { id: '4', name: 'David Chen', avatarUrl: 'https://picsum.photos/seed/user4/200/200', blurb: 'Musician and night owl.' },
];

export const circles: Circle[] = [
  {
    id: 'circle-1',
    name: 'Close Friends',
    members: ['1', '2', '3'],
    posts: [
      {
        id: 'post-1',
        authorId: '2',
        content: 'Beautiful sunset today! 🌅',
        imageUrl: 'https://picsum.photos/seed/post1/600/400',
        createdAt: '2024-07-29T18:30:00Z',
        expiresAt: '2024-07-30T18:30:00Z', // Expires 24 hours after creation
        likes: ['1', '3'],
        comments: [
          { id: 'comment-1', authorId: '3', text: 'Wow, stunning!', createdAt: '2024-07-29T18:35:00Z' },
        ],
      },
      {
        id: 'post-2',
        authorId: '3',
        content: 'Had a great time hiking this weekend. ⛰️',
        imageUrl: 'https://picsum.photos/seed/post2/600/400',
        createdAt: '2024-07-28T12:00:00Z',
        expiresAt: null, // Never expires
        likes: ['2'],
        comments: [],
      },
    ],
  },
  {
    id: 'circle-2',
    name: 'Family',
    members: ['1', '4'],
    posts: [
      {
        id: 'post-3',
        authorId: '4',
        content: 'My attempt at homemade pizza. 🍕',
        imageUrl: 'https://picsum.photos/seed/post3/600/400',
        createdAt: '2024-07-27T20:00:00Z',
        expiresAt: '2024-08-03T20:00:00Z', // Expires 1 week after creation
        likes: ['1'],
        comments: [],
      },
    ],
  },
  {
    id: 'circle-3',
    name: 'Work Buddies',
    members: ['1', '2', '4'],
    posts: [
        {
            id: 'post-4',
            authorId: '2',
            content: 'The city looks so different at night.',
            imageUrl: 'https://picsum.photos/seed/post4/600/400',
            createdAt: '2024-07-26T22:15:00Z',
            expiresAt: null, // Never expires
            likes: [],
            comments: [],
        }
    ],
  },
];

export function getUser(id: string): User | undefined {
  return users.find(u => u.id === id);
}
