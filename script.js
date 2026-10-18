const DEFAULTS = {
  name: "Kuya",
  bio: "[I walk the path of darkness to hope to see the light again.]",
  avatar: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=500&q=85",
  banner: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1800&q=85",
  followers: "8.7M",
  following: "1,284",
  friends: "642",
  love: "Eclipse"
};

const people = [
  {name:"Aether", followers:"892K", avatar:"https://i.pravatar.cc/300?img=12", banner:"https://images.unsplash.com/photo-1534791547706-6c7e972b3d5a?auto=format&fit=crop&w=1000&q=80", badge:"✦", streak:"3K", gif:"https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif", bio:"A quiet soul watching the stars."},
  {name:"Eclipse", followers:"1.9M", avatar:"https://i.pravatar.cc/300?img=47", banner:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1000&q=80", badge:"♥", streak:"12K", gif:"https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif", bio:"Somewhere between midnight and forever."},
  {name:"Mori", followers:"544K", avatar:"https://i.pravatar.cc/300?img=32", banner:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80", badge:"", streak:"", gif:"", bio:"Lost in the static."},
  {name:"Vanta", followers:"301K", avatar:"https://i.pravatar.cc/300?img=5", banner:"https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=80", badge:"✧", streak:"4.2K", gif:"https://media.giphy.com/media/xT0GqssRweIhlz209i/giphy.gif", bio:"No light without the dark."},
  {name:"Seraph", followers:"77K", avatar:"https://i.pravatar.cc/300?img=49", banner:"https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1000&q=80", badge:"", streak:"", gif:"", bio:"Keep moving."},
  {name:"Nox", followers:"2.2M", avatar:"https://i.pravatar.cc/300?img=68", banner:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=80", badge:"✦", streak:"8.9K", gif:"https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif", bio:"The night remembers everything."}
];

let profile = JSON.parse(localStorage.getItem("kuyaProfile") || "null") || DEFAULTS;

const $ = id => document.getElementById(id);

function applyProfile(){
  $("kuyaName").textContent = profile.name;
  $("kuyaBio").textContent = profile.bio;
  $("kuyaAvatar").src = profile.avatar;
  $("followers").textContent = profile.followers;
  $("following").textContent = profile.following;
  $("friends").textContent = profile.friends;
  document.documentElement.style.setProperty("--hero-bg", `url("${profile.banner}")`);
  $("loveOne").textContent = profile.name;
  $("loveTwo").textContent = profile.love;
}

function renderFriends(){
  $("friendsGrid").innerHTML = people.map((p,i)=>`
    <article class="friend-card" data-index="${i}" ${i>0 ? 'aria-label="Profile locked"' : ''}>
      ${i>0 ? '<span class="locked">PRIVATE</span>' : ''}
      <div class="card-banner" style="background-image:url('${p.banner}')"></div>
      <img class="card-avatar" src="${p.avatar}" alt="${p.name}">
      <div class="card-body">
        <div class="card-name">${p.name} ${p.badge ? `<span class="mini-badge">${p.badge}</span>` : ""}</div>
        <div class="card-user">@${p.name.toLowerCase()}</div>
        <div class="card-meta">
          <span>${p.followers} followers</span>
          ${p.streak ? `<span class="streak">${p.gif ? `<img src="${p.gif}" alt="">` : ""}${p.streak} streak</span>` : ""}
        </div>
      </div>
    </article>`).join("");
}

function openFriend(index){
  if(index !== 0) return;
  const p = people[index];
  $("modalBanner").style.backgroundImage = `url("${p.banner}")`;
  $("modalAvatar").src = p.avatar;
  $("modalName").textContent = p.name;
  $("modalBadge").textContent = p.badge;
  $("modalBio").textContent = p.bio;
  $("modalFollowers").textContent = p.followers;
  $("modalFollowing").textContent = "1,029";
  $("profileModal").classList.remove("hidden");
}

document.addEventListener("click", e=>{
  const card = e.target.closest(".friend-card");
  if(card) openFriend(Number(card.dataset.index));
  const close = e.target.closest("[data-close]");
  if(close) $(close.dataset.close).classList.add("hidden");
});

$("loveBadge").onclick = () => $("loveModal").classList.remove("hidden");
$("customizeBtn").onclick = () => {
  $("editName").value=profile.name; $("editBio").value=profile.bio; $("editAvatar").value=profile.avatar;
  $("editBanner").value=profile.banner; $("editFollowers").value=profile.followers; $("editFollowing").value=profile.following;
  $("editFriends").value=profile.friends; $("editLove").value=profile.love;
  $("customizeModal").classList.remove("hidden");
};
$("settingsBtn").onclick = () => $("customizeBtn").click();
$("friendsBtn").onclick = () => $("friendsGrid").scrollIntoView({behavior:"smooth",block:"center"});
$("saveProfile").onclick = () => {
  profile = {
    name:$("editName").value || DEFAULTS.name,
    bio:$("editBio").value || DEFAULTS.bio,
    avatar:$("editAvatar").value || DEFAULTS.avatar,
    banner:$("editBanner").value || DEFAULTS.banner,
    followers:$("editFollowers").value || DEFAULTS.followers,
    following:$("editFollowing").value || DEFAULTS.following,
    friends:$("editFriends").value || DEFAULTS.friends,
    love:$("editLove").value || DEFAULTS.love
  };
  localStorage.setItem("kuyaProfile", JSON.stringify(profile));
  applyProfile();
  $("customizeModal").classList.add("hidden");
};

function particles(){
  const box=$("particles");
  for(let i=0;i<45;i++){
    const s=document.createElement("i");
    s.style.left=Math.random()*100+"vw";
    s.style.animationDuration=(8+Math.random()*16)+"s";
    s.style.animationDelay=(-Math.random()*18)+"s";
    s.style.opacity=(.15+Math.random()*.55);
    box.appendChild(s);
  }
}
applyProfile(); renderFriends(); particles();
