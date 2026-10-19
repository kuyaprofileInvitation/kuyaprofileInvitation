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
  {name:"A-SHEN-TADES", followers:"4,9K Friends/ 1,9M", avatar:"Profiles/tades.jpg", banner:"Banners/tades_banner.jpg", badge:"♥Kuya's Pinned!♥", streak:"1B🔱", gif:"16-15-16-464_512.gif"},
  {name:"TOZI [NOODLE BIG BACK]", followers:"600 Friends/ 300K", avatar:"Profiles/tozi.jpg", banner:"Banners/tozi_banner.jpg", badge:"♥Kuya's Pinned!♥", streak:"1B🔱", gif:"16-15-16-464_512.gif"},
  {name:"Light_Noiz", followers:"200 Friends/ 978K", avatar:"Profiles/light.jpg", banner:"Banners/light_banner.gif", badge:"♥Kuya's Pinned!♥", streak:"1B🔱", gif:"16-15-16-464_512.gif"},
  {name:"Clenn", followers:"90 Friends/ 1,2M", avatar:"Profiles/clenn.gif", banner:"Banners/NoBanner.webp", badge:"♥Kuya's Pinned!♥", streak:"1B🔱", gif:"16-15-16-464_512.gif"},

  {name:"Hottie", followers:"120 Friends/110M", avatar:"Profiles/hottie-kottie.gif", banner:"Banners/NoBanner.webp", badge:"♥Kuya's Pinned!♥", streak:"789M", gif:"streak.gif"},
  {name:"Auddo!", followers:"983 Friends/ 890", avatar:"Profiles/Auddo.webp", banner:"Banners/NoBanner.webp", badge:"♥Kuya's Pinned!♥", streak:"890M", gif:"streak.gif"},
  {name:"Yoriyen", followers:"7 Friends/ 6,2M", avatar:"Profiles/yoriyen.webp", banner:"Banners/yoriyen_banner.jpg", badge:"DEV!", streak:"234", gif:"streak.gif"},
  {name:"Daniela", followers:"567 Friends/ 340K", avatar:"Profiles/Daniela.webp", banner:"Banners/NoBanner.webp", badge:"Kuya's most talk to.✦", streak:"567K", gif:"streak.gif"},
  {name:"ECHO//SHARE", followers:"1,890 Friends/ 2M", avatar:"Profiles/echo.webp", banner:"Banners/echo_share_banner.gif", badge:"STAFF✦/Kuya's most talk to.✦", streak:"2B", gif:"streak.gif"},
  {name:"Clockturn", followers:"4 Friends/ 5,6M", avatar:"Profiles/clockturn.webp", banner:"Banners/NoBanner.webp", badge:"DEV!✦", streak:"234", gif:"streak.gif"},
  {name:"av,OBrozn", followers:"4,778 Friends/ 78", avatar:"Profiles/av,OBrozn.webp", banner:"Banners/NoBanner.webp", badge:"Kuya's mutual✦", streak:"4,569", gif:"streak.gif"},
  {name:"TOWWO-BOWWO", followers:"56 Friends/ 956K", avatar:"Profiles/TOWWO-BOWWO.webp", banner:"Banners/NoBanner.webp", badge:"Kuya's most talk to.✦", streak:"234", gif:"streak.gif"},
  {name:"SICKY!!", followers:"678 Friends/ 5K", avatar:"Profiles/sicky.gif", banner:"Banners/NoBanner.webp", badge:"♥Kuya's Pinned!♥", streak:"7M", gif:"streak.gif"},
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
