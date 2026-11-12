const a=e=>String(e??"").replace(/[&<>"']/g,d=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[d]),l=e=>Math.round(e).toLocaleString("he-IL"),n=e=>(Math.round(e*10)/10).toLocaleString("he-IL");function b(e){var $,i;const d=new Map;for(const t of e.rows)d.set(t.d,(d.get(t.d)??0)+t.kg);const h=[...d.values()].reduce((t,o)=>t+o,0),r=[...new Set(e.rows.map(t=>t.sheet))],s=new Map;for(const t of e.electrical??[]){const o=`${t.type}|${t.element}|${t.role}`,m=s.get(o)??{type:t.type,element:t.element,role:t.role,unit:t.unit,count:0};m.count+=t.count,s.set(o,m)}const c=`${e.rows.length||!s.size?"כמויות ברזל":"כמויות חשמל"}${e.project?` · ${e.project}`:""}`;return`<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${a(c)}</title>
<style>body{font-family:system-ui,Arial,sans-serif;margin:24px auto;max-width:900px;padding:0 16px;color:#1c1c1c}h1{font-size:1.4rem}h2{font-size:1.1rem;margin-top:1.6em}table{border-collapse:collapse;width:100%;margin:8px 0;font-size:.92rem}th,td{border:1px solid #ccc;padding:4px 8px;text-align:start}th{background:#f2f2f2}td.n{text-align:end}.meta{color:#555}.note{background:#fff7e0;border:1px solid #e6cf8a;padding:6px 10px;border-radius:6px}@media print{body{margin:0}}</style></head><body>
<h1>${a(c)}</h1>
<p class="meta">${e.customer?`${a(e.customer)} · `:""}${a(new Date(e.at??Date.now()).toLocaleDateString("he-IL"))}${e.by?` · ${a(e.by)}`:""} · קובץ לקריאה בלבד, נוצר ב-SFC</p>
${e.rows.length||!s.size?`<p><b>${n(h/1e3)} טון</b> · ${e.rows.length} שורות · ${r.length} גיליונות</p>
<h2>לפי קוטר</h2>
<table><thead><tr><th>קוטר</th><th>ק"ג</th><th>טון</th></tr></thead><tbody>
${[...d.entries()].sort((t,o)=>t[0]-o[0]).map(([t,o])=>`<tr><td>Ø${t}</td><td class="n">${l(o)}</td><td class="n">${n(o/1e3)}</td></tr>`).join(`
`)}
<tr><th>סה"כ</th><th class="n">${l(h)}</th><th class="n">${n(h/1e3)}</th></tr></tbody></table>`:""}
${s.size?`<h2>חשמל · סיכום</h2><table><thead><tr><th>סוג</th><th>פירוט</th><th>כמות</th></tr></thead><tbody>${[...s.values()].map(t=>`<tr><td>${a(t.element)}</td><td>${a(t.role)}</td><td class="n">${l(t.count)} ${a(t.unit)}</td></tr>`).join("")}</tbody></table>`:""}
${($=e.stages)!=null&&$.length?`<h2>שלבים</h2><table><tbody>${e.stages.map(t=>`<tr><td>${a(t.name)}</td><td>${a(t.status??"")}</td></tr>`).join("")}</tbody></table>`:""}
${(i=e.openQuestions)!=null&&i.length?`<h2>שאלות פתוחות</h2><div class="note"><ul>${e.openQuestions.slice(0,40).map(t=>`<li>${a(t)}</li>`).join("")}</ul></div>`:""}
${r.map(t=>`<h2>${a(t)}</h2><table><thead><tr><th>אלמנט</th><th>תפקיד</th><th>Ø</th><th>כמות</th><th>אורך (מ')</th><th>ק"ג</th></tr></thead><tbody>
${e.rows.filter(o=>o.sheet===t).map(o=>`<tr><td>${a(o.element)}</td><td>${a(o.role)}</td><td>${a(o.d)}</td><td class="n">${a(o.count)}</td><td class="n">${a(o.length)}</td><td class="n">${n(o.kg)}</td></tr>`).join(`
`)}
</tbody></table>`).join(`
`)}
</body></html>
`}export{b as shareHtml};
