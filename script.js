const DEFAULTS = {
  name: "Kuya",
  bio: "Being yourself is more Attractive than being someone you're not.",
  avatar: "kuya.gif",
  banner: "kuya_banner.webp",
  followers: "7,567",
  following: "1,284",
  friends: "80",
  love: "¿alex!/rub1xthecube"
};

const people = [
  {name:"A-SHEN-TADES", followers:"1,9M/ 4,9K Friends", avatar:"Profiles/tades.jpg", banner:"Banners/tades_banner.jpg", badge:"Kuya's most talk to.✦", streak:"890K", gif:"streak.gif"},
  {name:"TOZI [NOODLE BIG BACK]", followers:"300k/ 600 Friends", avatar:"Profiles/tozi.jpg", banner:"Banners/tozi_banner.jpg", badge:"Kuya's most talk to.✦", streak:"789K", gif:"streak.gif"},
  {name:"Auddo!", followers:"890", avatar:"Profiles/Auddo.webp", banner:"Banners/NoBanner.webp", badge:"Kuya's most talk to.✦", streak:"890K", gif:"streak.gif"},
  {name:"Yoriyen", followers:"6,2M/ 7 Friends", avatar:"Profiles/yoriyen.webp", banner:"Banners/yoriyen_banner.jpg", badge:"DEV!", streak:"234", gif:"streak.gif"},
  
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
// Settings/customization UI intentionally removed.
$("friendsBtn").onclick = () => $("friendsGrid").scrollIntoView({behavior:"smooth",block:"center"});

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
