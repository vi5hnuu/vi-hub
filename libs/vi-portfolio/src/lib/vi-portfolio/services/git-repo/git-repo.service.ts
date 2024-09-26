import { Injectable, OnDestroy } from '@angular/core';
import { Octokit } from '@octokit/rest';
import { environment } from '@env';
import { GitRepo } from '../../models/git-repo';
import { Subscription } from 'rxjs';


type RepositoriesState={repositories:GitRepo[],loading?:boolean,error?:string};

@Injectable()
export class GitRepoService implements OnDestroy{
  private subscriptions:Map<string,Subscription> = new Map<string,Subscription>();
  private _octokit = new Octokit({auth: environment.GH_TOKEN});
  private repositoriesState:RepositoriesState={repositories:[]};

  async initGitRepos(){
    if(this.repositoriesState.loading) return;
    this.repositoriesState={...this.repositoriesState,repositories:[],loading:true,error:undefined};
    try{
      this.repositoriesState={...this.repositoriesState,repositories:await this.getAllRepos(),loading:false,error:undefined};
    }catch (error:any){
      this.repositoriesState={...this.repositoriesState,loading:false,error:'Failed to load repositories.'};
    }
  }

  private async getAllRepos(){
    let pageNo=0;
    const tempRepos:GitRepo[]=[];
    while(true){
      const response=await this._octokit.repos
        .listForAuthenticatedUser({page:pageNo,sort:'created',per_page:100,direction:'desc'});
      const repos=(response.data as unknown) as GitRepo[];
      tempRepos.push(...repos);
      if(repos.length<100) break;
      pageNo++;
    }
    return tempRepos;
  }

  get repositories(){
    return this.repositoriesState.repositories;
  }

  get isLoading(){
    return this.repositoriesState.loading;
  }

  get hasError(){
    return this.repositoriesState.error;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
