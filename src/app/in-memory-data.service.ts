import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemDataService implements InMemoryDbService {
  createDb() {
    let users = [
      { id: 1, name: 'Albania' },
      { id: 2, name: 'Australia' },
      { id: 3, name: 'Austria' },
      { id: 4, name: 'Belarus' },
      { id: 5, name: 'Brazil' }
    ];
    return {users: {
        total: users.length,
        results: users
      }};
  }
}
