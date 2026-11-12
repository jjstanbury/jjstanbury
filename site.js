'use strict';
// Replay entrance reveals independently of Wix. The layout and CSS come from the desktop reference.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
 }), {threshold:0.06});
 document.querySelectorAll('[data-motion-enter]').forEach(el=>{el.classList.add('standalone-reveal');observer.observe(el);});
}
const form=document.getElementById('contact-form');
const status=document.getElementById('form-status');
const endpoint=window.SITE_CONFIG?.formEndpoint || '';
if(/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint))form.action=endpoint;
form.addEventListener('submit',async event=>{
 event.preventDefault();
 if(!form.reportValidity())return;
 if(!form.hasAttribute('action')){status.textContent='The contact form is awaiting activation. Please use the email link on this page.';return;}
 const button=form.querySelector('[type="submit"]');button.disabled=true;status.textContent='Sending…';
 try{
  const data=new FormData(form);if(countryCode&&data.get('phone'))data.set('phone',countryCode+' '+data.get('phone'));
  const response=await fetch(form.action,{method:'POST',body:data,headers:{Accept:'application/json'}});
  if(!response.ok)throw new Error('Submission failed');
  status.textContent='Thank you! Your message has been sent.';form.reset();
 }catch(error){status.textContent='Your message could not be sent. Please try again or use the email link.';}
 finally{button.disabled=false;}
});
let countryCode='';let picker;
const trigger=form.querySelector('[data-hook="country-selector-trigger"]');
trigger.addEventListener('click',async()=>{
 if(picker){closePicker();return;}
 picker=document.createElement('div');picker.id='phone-picker';picker.setAttribute('role','dialog');picker.setAttribute('aria-label','Select a country code');
 const search=document.createElement('input');search.type='search';search.placeholder='Search';search.setAttribute('aria-label','Search countries');picker.append(search);
 const list=document.createElement('div');picker.append(list);trigger.closest('[data-hook="prefix"]').append(picker);trigger.setAttribute('aria-expanded','true');
 try{
  const countries=await fetch('countries.json').then(r=>r.json());
  const render=()=>{list.replaceChildren();countries.filter(c=>(c.name+' '+c.code).toLowerCase().includes(search.value.toLowerCase())).forEach(c=>{
   const b=document.createElement('button');b.type='button';b.textContent=c.name+' '+c.code;b.onclick=()=>{countryCode=c.code;trigger.title=c.name+' '+c.code;form.querySelector('[name="phone"]').placeholder=c.code;closePicker();};list.append(b);
  });};search.addEventListener('input',render);render();search.focus();
 }catch{list.textContent='Enter your full phone number including country code.';}
});
function closePicker(){picker?.remove();picker=null;trigger.setAttribute('aria-expanded','false');trigger.focus();}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&picker)closePicker();});
document.addEventListener('click',e=>{if(picker&&!picker.contains(e.target)&&!trigger.contains(e.target))closePicker();});

// Make each complete project card clickable once its real destination is configured.
document.querySelectorAll('.project-card').forEach(card=>{const name=card.querySelector('h3')?.textContent.trim();const url=window.PROJECT_LINKS?.[name];if(!url)return;try{const parsed=new URL(url);if(!['https:','http:'].includes(parsed.protocol))return;const a=document.createElement('a');a.href=parsed.href;a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label',name+' — open project');while(card.firstChild)a.append(card.firstChild);card.append(a);}catch{}});
