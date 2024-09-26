import { TestBed } from '@angular/core/testing';

import { GitRepoService } from './git-repo.service';

describe('GitRepoService', () => {
  let service: GitRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
