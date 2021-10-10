import { MoreThanOrEqual } from 'typeorm';
import { getRecentUsers, User } from '../models/User';

describe('getRecentUsers', () => {
  const user1Username = 'Laure';
  const user2Username = 'Laurent';
  const user3Username = 'Lorenzo';
  const user4Username = 'Luc';
  const user5Username = 'Lise';

  const arbitraryTimestamp = 1625669251746;
  Date.now = jest.fn(() => arbitraryTimestamp);
  const _24HoursAgoTimestamp = arbitraryTimestamp - 24 * 3600 * 1000;
  const _24HoursAgoDate = new Date(_24HoursAgoTimestamp);

  it('calls User.find with proper arguments', async () => {
    await getRecentUsers();
    expect(User.find).toHaveBeenCalledTimes(1);
    expect(User.find).toHaveBeenCalledWith({
      where: { createdAt: MoreThanOrEqual(_24HoursAgoDate) },
    });
  });

  describe('when no user created in the last 24 hours', () => {
    User.find = jest.fn(() => Promise.resolve([]));
    it('returns proper summary', async () => {
      expect(await getRecentUsers()).toBe('Nobody registered today.');
    });
  });

  describe('when one user created in the last 24 hours', () => {
    it('returns proper summary', async () => {
      User.find = jest.fn(() => Promise.resolve([{ username: user1Username }]));
      expect(await getRecentUsers()).toBe(`${user1Username} registered today.`);
    });
  });

  describe('when two users created in the last 24 hours', () => {
    it('returns proper summary', async () => {
      User.find = jest.fn(() =>
        Promise.resolve([
          { username: user1Username },
          { username: user2Username },
        ])
      );
      expect(await getRecentUsers()).toBe(
        `${user1Username} and ${user2Username} registered today.`
      );
    });
  });

  describe('when three users created in the last 24 hours', () => {
    it('returns proper summary', async () => {
      User.find = jest.fn(() =>
        Promise.resolve([
          { username: user1Username },
          { username: user2Username },
          { username: user3Username },
        ])
      );
      expect(await getRecentUsers()).toBe(
        `${user1Username}, ${user2Username} and ${user3Username} registered today.`
      );
    });
  });

  describe('when four users created in the last 24 hours', () => {
    it('returns proper summary', async () => {
      User.find = jest.fn(() =>
        Promise.resolve([
          { username: user1Username },
          { username: user2Username },
          { username: user3Username },
          { username: user4Username },
        ])
      );
      expect(await getRecentUsers()).toBe(
        `${user1Username}, ${user2Username} and 2 others registered today.`
      );
    });
  });

  describe('when five users created in the last 24 hours', () => {
    it('returns proper summary', async () => {
      User.find = jest.fn(() =>
        Promise.resolve([
          { username: user1Username },
          { username: user2Username },
          { username: user3Username },
          { username: user4Username },
          { username: user5Username },
        ])
      );
      expect(await getRecentUsers()).toBe(
        `${user1Username}, ${user2Username} and 3 others registered today.`
      );
    });
  });
});
