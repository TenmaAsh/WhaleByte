/**
 * WhaleByte App Type Definitions
 * 
 * This file contains TypeScript interfaces and types used throughout the app.
 */

import { CONTENT_TYPES, TRANSACTION_TYPES, USER_ROLES } from '../constants';

// User Types
export interface User {
  id: string;
  username: string;
  email?: string;
  publicWalletAddress: string;
  trustFactor: number;
  bio?: string;
  avatarUrl?: string;
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
  role: keyof typeof USER_ROLES;
  notificationPreferences: NotificationPreferences;
}

export interface NotificationPreferences {
  transactions: boolean;
  messages: boolean;
  content: boolean;
}

// Wallet Types
export interface Wallet {
  address: string;
  balance: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  senderAddress: string;
  receiverAddress: string;
  amount: number;
  transactionType: keyof typeof TRANSACTION_TYPES;
  blockchainTxHash?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
  relatedPostId?: string;
  relatedSphereId?: string;
}

// Sphere Types
export interface Sphere {
  id: string;
  name: string;
  description: string;
  category: string;
  isPrivate: boolean;
  entryFee: number;
  creatorId: string;
  rules?: string;
  createdAt: Date;
  updatedAt: Date;
  memberCount: number;
  contentCount: number;
  members?: SphereMember[];
  posts?: Post[];
}

export interface SphereMember {
  id: string;
  sphereId: string;
  userId: string;
  role: 'member' | 'moderator' | 'creator';
  joinedAt: Date;
  user?: User;
}

// Content Types
export interface Post {
  id: string;
  sphereId: string;
  userId: string;
  content: string;
  mediaUrls?: string[];
  isPremium: boolean;
  premiumCost: number;
  ipfsHash?: string;
  createdAt: Date;
  updatedAt: Date;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  user?: User;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  ipfsHash?: string;
  createdAt: Date;
  updatedAt: Date;
  upvotes: number;
  downvotes: number;
  user?: User;
}

export interface Vote {
  id: string;
  userId: string;
  postId?: string;
  commentId?: string;
  voteType: 'upvote' | 'downvote';
  createdAt: Date;
}

// Report Types
export interface Report {
  id: string;
  reporterId: string;
  reportedPostId?: string;
  reportedCommentId?: string;
  reportedUserId?: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'actioned' | 'dismissed';
  createdAt: Date;
  updatedAt: Date;
  reporter?: User;
}

// Chat Types
export interface ChatRoom {
  id: string;
  name?: string;
  isGroup: boolean;
  isSphereChat: boolean;
  sphereId?: string;
  createdAt: Date;
  updatedAt: Date;
  members?: ChatRoomMember[];
  messages?: Message[];
}

export interface ChatRoomMember {
  id: string;
  chatRoomId: string;
  userId: string;
  role: 'member' | 'admin';
  joinedAt: Date;
  lastReadAt: Date;
  user?: User;
}

export interface Message {
  id: string;
  chatRoomId: string;
  senderId: string;
  content?: string;
  mediaUrls?: string[];
  isEncrypted: boolean;
  encryptionMetadata?: any;
  selfDestructAt?: Date;
  createdAt: Date;
  isDeleted: boolean;
  sender?: User;
}

// Governance Types
export interface GovernanceProposal {
  id: string;
  sphereId: string;
  creatorId: string;
  title: string;
  description: string;
  proposalType: 'moderator_election' | 'rule_change' | 'other';
  status: 'active' | 'passed' | 'rejected' | 'implemented';
  createdAt: Date;
  endsAt: Date;
  votesFor: number;
  votesAgainst: number;
  creator?: User;
  votes?: GovernanceVote[];
}

export interface GovernanceVote {
  id: string;
  proposalId: string;
  userId: string;
  vote: boolean; // true for 'for', false for 'against'
  createdAt: Date;
  user?: User;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'transaction' | 'message' | 'post_interaction' | 'report' | 'governance';
  content: string;
  isRead: boolean;
  relatedEntityType?: 'post' | 'comment' | 'transaction' | 'message' | 'proposal';
  relatedEntityId?: string;
  createdAt: Date;
}

// Authentication Types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupData {
  username: string;
  email?: string;
  password: string;
  passphrase: string; // Generated passphrase for wallet
}

/**
 * Navigation Types
 * Type definitions for navigation in the app
 */

// Root Stack Navigator Types
export type RootStackParamList = {
  // Auth screens
  Login: undefined;
  Signup: undefined;
  PassphraseGeneration: { 
    signupData: { 
      username: string; 
      email?: string; 
      password: string; 
    } 
  };
  PassphraseValidation: { 
    passphrase: string; 
    signupData: { 
      username: string; 
      email?: string; 
      password: string; 
      passphrase: string; 
    } 
  };
  Welcome: undefined;
  
  // Main tab screens
  MainTabs: undefined;
  Home: undefined;
  Explore: undefined;
  Profile: undefined;
  
  // Sphere screens
  Spheres: undefined;
  SphereDetails: { sphereId: string };
  SphereCreate: undefined;
  SpherePostDetails: { sphereId: string; postId: string };
  SphereCreatePost: { sphereId: string };
  
  // SphereRec screens
  SphereRec: undefined;
  
  // Wallet screens
  Wallet: undefined;
};

// Main Tab Navigator Types
export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Spheres: undefined;
  Profile: undefined;
  Wallet: undefined;
};

// Sphere Stack Navigator Types
export type SphereStackParamList = {
  SpheresList: undefined;
  SphereDetails: { sphereId: string };
  SphereCreate: undefined;
  JoinSphere: undefined;
};

// Wallet Stack Navigator Types
export type WalletStackParamList = {
  WalletHome: undefined;
  Send: undefined;
  Receive: undefined;
  TransactionHistory: undefined;
  TransactionDetails: { transactionId: string };
};

// Profile Stack Navigator Types
export type ProfileStackParamList = {
  ProfileHome: undefined;
  EditProfile: undefined;
  Settings: undefined;
  Security: undefined;
  Help: undefined;
};

/**
 * Data Types
 * Type definitions for data models in the app
 */

// User Profile
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  createdAt: Date;
  walletAddress: string;
}

// Transaction
export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap';
  amount: number;
  tokenSymbol: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  from?: string;
  to?: string;
  fee?: number;
  memo?: string;
}

// Sphere (Community)
export interface Sphere {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  memberCount: number;
  createdAt: Date;
  creatorId: string;
  isPublic: boolean;
  tags: string[];
}

// Token
export interface Token {
  symbol: string;
  name: string;
  balance: number;
  value: number; // Value in USD or other reference currency
  change24h: number; // Percentage change in last 24 hours
}

// Wallet
export interface Wallet {
  address: string;
  tokens: Token[];
  totalValue: number;
}