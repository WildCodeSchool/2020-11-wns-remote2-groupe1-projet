import { MoreThanOrEqual } from 'typeorm';
import { getRecentUsers, User } from '../models/User';

describe('getRecentUsers', () => {
  const user1Firstname = 'Laure';
  const user2Firstname = 'Laurent';
  const user3Firstname = 'Lorenzo';
  const user4Firstname = 'Luc';
  const user5Firstname = 'Lise';

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
      User.find = jest.fn(() =>
        Promise.resolve([{ firstName: user1Firstname }])
      );
      expect(await getRecentUsers()).toBe(
        `${user1Firstname} registered today.`
      );
    });
  });

  describe('when two users created in the last 24 hours', () => {
    it('returns proper summary', async () => {
      User.find = jest.fn(() =>
        Promise.resolve([
          { firstName: user1Firstname },
          { firstName: user2Firstname },
        ])
      );
      expect(await getRecentUsers()).toBe(
        `${user1Firstname} and ${user2Firstname} registered today.`
      );
    });
  });

  describe('when three users created in the last 24 hours', () => {
    it('returns proper summary', async () => {
      User.find = jest.fn(() =>
        Promise.resolve([
          { firstName: user1Firstname },
          { firstName: user2Firstname },
          { firstName: user3Firstname },
        ])
      );
      expect(await getRecentUsers()).toBe(
        `${user1Firstname}, ${user2Firstname} and ${user3Firstname} registered today.`
      );
    });
  });

  describe('when four users created in the last 24 hours', () => {
    it('returns proper summary', async () => {
      User.find = jest.fn(() =>
        Promise.resolve([
          { firstName: user1Firstname },
          { firstName: user2Firstname },
          { firstName: user3Firstname },
          { firstName: user4Firstname },
        ])
      );
      expect(await getRecentUsers()).toBe(
        `${user1Firstname}, ${user2Firstname} and 2 others registered today.`
      );
    });
  });

  describe('when five users created in the last 24 hours', () => {
    it('returns proper summary', async () => {
      User.find = jest.fn(() =>
        Promise.resolve([
          { firstName: user1Firstname },
          { firstName: user2Firstname },
          { firstName: user3Firstname },
          { firstName: user4Firstname },
          { firstName: user5Firstname },
        ])
      );
      expect(await getRecentUsers()).toBe(
        `${user1Firstname}, ${user2Firstname} and 3 others registered today.`
      );
    });
  });
});
