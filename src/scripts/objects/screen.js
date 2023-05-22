const screen = {
  userProfile: document.querySelector('.profile-data'),
  renderUser(user){
    this.userProfile.innerHTML = `<div class="info">
                                    <img src="${user.avatarUrl}" alt="Foto do Perfil do usuário" />
                                    <div class="data">
                                      <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                                      <p>${user.bio ?? 'Não possui Bio cadastrada 😥'}</p>
                                      <p>👥Seguidores: ${user.followers  ?? 'Não possui seguidores 😥'}</p> 
                                      <p>👥Seguindo: ${user.following  ?? 'Não segue ninguem 😥'}</p>
                                    </div>
                                  </div>`


    let repositoriesItens = ""
    user.repositories.forEach(repo => {
      repositoriesItens += 
        `<li>
            <a href="${repo.html_url}" target="_blank">
                <h3>${repo.name}</h3><br>
                <span> 🍴${
                  repo.forks === 0 ? "Sem forks" : repo.forks
                }</span>
                <span>👀${
                  repo.watchers === 0 ? "Sem watchers" : repo.watchers
                }</span>
                <span>⭐${
                  repo.stargazers_count === 0
                    ? "Sem estrelas"
                    : repo.stargazers_count
                }</span> 
                <span>👨‍💻${repo.language ?? "Sem Linguagens"}</span>
            </a>
        </li>`
    });

    if(user.repositories.length > 0){                           
    this.userProfile.innerHTML += ` <div class="repositories section">
                                      <h2> Repositórios </h2>
                                      <ul>${repositoriesItens}</ul>
                                    </div>`
    }

    let eventItens = ""
    user.events.forEach(event => {
      if (event.type === 'PushEvent'){
        eventItens +=
        `<li class="eventos">
          <h3>${event.repo.name}</h3> - <p>${event.payload.commits[0].message}</p> 
         </li>`
      }else{
        eventItens +=
        `<li class="eventos">
          <h3>${event.repo.name}</h3> - <p>${event.payload.ref_type}</p> 
          <br>
         </li>`
      }
       
    });

    if(user.events.length > 0){                           
      this.userProfile.innerHTML += ` <div class="section lista">
                                        <h2> Eventos </h2><br>
                                        <ul>${eventItens}</ul>
                                      </div>`
      }

  },
  renderNotFound(){
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
  }
}

export { screen }