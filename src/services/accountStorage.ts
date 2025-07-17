import { blink } from '../blink/client';

export interface ConnectedAccount {
  id: string;
  service_name: string;
  provider: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

class AccountStorageService {
  private storageKey = 'connected_accounts.json';
  private localCache: ConnectedAccount[] = [];
  private userId: string | null = null;

  async initialize(userId: string) {
    this.userId = userId;
    await this.loadAccounts();
  }

  private async loadAccounts(): Promise<void> {
    if (!this.userId) return;

    try {
      // Try to load from cloud storage first
      const files = await blink.storage.list(`${this.userId}/`);
      const accountFile = files.find(f => f.name.endsWith(this.storageKey));
      
      if (accountFile) {
        // File exists in cloud storage, download it
        const response = await fetch(accountFile.publicUrl);
        if (response.ok) {
          const data = await response.json();
          this.localCache = data;
          // Sync to local storage as backup
          localStorage.setItem('connectedAccounts', JSON.stringify(data));
          return;
        }
      }
    } catch (error) {
      console.log('Cloud storage not available, using local storage');
    }

    // Fall back to local storage
    const localData = localStorage.getItem('connectedAccounts');
    this.localCache = localData ? JSON.parse(localData) : [];
  }

  private async saveAccounts(): Promise<void> {
    if (!this.userId) return;

    // Save to local storage immediately
    localStorage.setItem('connectedAccounts', JSON.stringify(this.localCache));

    try {
      // Save to cloud storage
      const blob = new Blob([JSON.stringify(this.localCache, null, 2)], { 
        type: 'application/json' 
      });
      const file = new File([blob], this.storageKey, { type: 'application/json' });
      
      await blink.storage.upload(
        file,
        `${this.userId}/${this.storageKey}`,
        { upsert: true }
      );
    } catch (error) {
      console.error('Failed to save to cloud storage:', error);
      // Local storage is already updated, so the data is not lost
    }
  }

  async getAccounts(): Promise<ConnectedAccount[]> {
    return this.localCache;
  }

  async addAccount(serviceName: string, provider: string): Promise<void> {
    if (!this.userId) return;

    const now = new Date().toISOString();
    const newAccount: ConnectedAccount = {
      id: crypto.randomUUID(),
      service_name: serviceName,
      provider: provider,
      user_id: this.userId,
      created_at: now,
      updated_at: now
    };

    // Check if account already exists
    const existingIndex = this.localCache.findIndex(
      acc => acc.service_name === serviceName && acc.user_id === this.userId
    );

    if (existingIndex >= 0) {
      // Update existing account
      this.localCache[existingIndex] = { ...newAccount };
    } else {
      // Add new account
      this.localCache.push(newAccount);
    }

    await this.saveAccounts();
  }

  async removeAccount(serviceName: string): Promise<void> {
    if (!this.userId) return;

    this.localCache = this.localCache.filter(
      acc => !(acc.service_name === serviceName && acc.user_id === this.userId)
    );

    await this.saveAccounts();
  }

  async clearAllAccounts(): Promise<void> {
    if (!this.userId) return;

    this.localCache = [];
    await this.saveAccounts();
  }
}

export const accountStorage = new AccountStorageService();