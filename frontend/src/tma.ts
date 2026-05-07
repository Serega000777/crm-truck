import { retrieveRawInitData, retrieveLaunchParams } from '@tma.js/sdk';

export function getTelegramInitData(): string | null {
  try {
    const raw = retrieveRawInitData();
    return raw || null;
  } catch {
    return null;
  }
}

export function getTelegramLaunchInfo() {
  try {
    return retrieveLaunchParams();
  } catch {
    return null;
  }
}
