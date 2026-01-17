const CODE = "2003";

/* ================= LOGIN ================= */
function verifierCode() {
  const input = document.getElementById("code").value;
  const loginBox = document.getElementById("login");
  const menu = document.getElementById("menu");

  if (input === CODE) {
    loginBox.classList.add("hidden");
    menu.classList.remove("hidden");

  } else {
    alert("❌ Code incorrect ! Essaie encore 😅");
    document.getElementById("code").value = "";
    document.getElementById("code").focus();
  }
}

/* ================= NAVIGATION ================= */
function showSection(id) {
  document.querySelectorAll(".section").forEach(s =>
    s.classList.add("hidden")
  );
  document.getElementById(id).classList.remove("hidden");
}

/* ================= MATRICE 2x2 ================= */
function determinant2() {
  const a = Number(document.getElementById("a").value);
  const b = Number(document.getElementById("b").value);
  const c = Number(document.getElementById("c").value);
  const d = Number(document.getElementById("d").value);

  const det = a * d - b * c;
  const result = document.getElementById("resultM2");
  result.innerHTML = `🧮 Déterminant = ${det}`;
  result.style.color = det === 0 ? "red" : "green";
}

function inverse2() {
  const a = Number(document.getElementById("a").value);
  const b = Number(document.getElementById("b").value);
  const c = Number(document.getElementById("c").value);
  const d = Number(document.getElementById("d").value);
  const det = a * d - b * c;
  const result = document.getElementById("resultM2");

  if (det === 0) {
    result.innerHTML = "❌ Inverse impossible (det nul)";
    result.style.color = "red";
  } else {
    result.innerHTML = `✅ Inverse = (1/${det}) × [[${d}, ${-b}], [${-c}, ${a}]]`;
    result.style.color = "green";
  }
}

/* ================= MATRICE 3x3 ================= */
function determinant3() {
  const A = Number(document.getElementById("a3").value);
  const B = Number(document.getElementById("b3").value);
  const C = Number(document.getElementById("c3").value);
  const D = Number(document.getElementById("d3").value);
  const E = Number(document.getElementById("e3").value);
  const F = Number(document.getElementById("f3").value);
  const G = Number(document.getElementById("g3").value);
  const H = Number(document.getElementById("h3").value);
  const I = Number(document.getElementById("i3").value);

  const det = A*(E*I-H*F) - B*(D*I-G*F) + C*(D*H-G*E);
  const result = document.getElementById("resultM3");
  result.innerHTML = `🧮 Déterminant = ${det}`;
  result.style.color = det === 0 ? "red" : "green";
}

/* ================= SYSTEME 2 INCONNUES ================= */
function systeme2() {
  const a = Number(document.getElementById("a1").value);
  const b = Number(document.getElementById("b1").value);
  const c = Number(document.getElementById("c1").value);
  const d = Number(document.getElementById("d1").value);
  const x = Number(document.getElementById("x1").value);
  const y = Number(document.getElementById("y1").value);

  const det = a*d - b*c;
  const result = document.getElementById("resultSys2");

  if (det === 0) {
    result.innerHTML = "❌ Système impossible (det nul)";
    result.style.color = "red";
    return;
  }

  const X = (x*d - b*y)/det;
  const Y = (a*y - c*x)/det;

  result.innerHTML = `✅ X = ${X.toFixed(2)}, Y = ${Y.toFixed(2)}`;
  result.style.color = "green";
}

/* ================= SYSTEME 4 INCONNUES ================= */
function resoudreSysteme4() {
  let M = [];
  for (let i=1; i<=4; i++) {
    let ligne = [];
    for (let j=1; j<=4; j++) {
      ligne.push(Number(document.getElementById(`a${i}${j}`).value));
    }
    ligne.push(Number(document.getElementById(`b${i}`).value));
    M.push(ligne);
  }

  for (let i=0; i<4; i++) {
    if(M[i][i]===0) {
      document.getElementById("resultSys4").innerHTML="❌ Impossible de résoudre (pivot nul)";
      return;
    }
    for (let j=i+1; j<4; j++){
      let f = M[j][i]/M[i][i];
      for(let k=i;k<5;k++) M[j][k]-=f*M[i][k];
    }
  }

  let R=M[3][4]/M[3][3];
  let Z=(M[2][4]-M[2][3]*R)/M[2][2];
  let Y=(M[1][4]-M[1][3]*R-M[1][2]*Z)/M[1][1];
  let X=(M[0][4]-M[0][3]*R-M[0][2]*Z-M[0][1]*Y)/M[0][0];

  const result = document.getElementById("resultSys4");
  result.innerHTML = `✅ X=${X.toFixed(2)}, Y=${Y.toFixed(2)}, Z=${Z.toFixed(2)}, R=${R.toFixed(2)}`;
  result.style.color = "green";
}

/* ================= JEU DE DEVINETTE ================= */
let solution = null;
let essais = 0;

function jouer() {
  const max = Number(document.getElementById("intervalle").value);
  const guess = Number(document.getElementById("guess").value);
  const result = document.getElementById("resultJeu");

  if (!max || max < 1) {
    result.innerHTML = "❌ Intervalle invalide";
    result.style.color = "red";
    return;
  }

  if(solution===null){
    solution = Math.floor(Math.random()*max)+1;
    essais=0;
    result.innerHTML = `💡 J'ai choisi un nombre entre 1 et ${max}. Devine !`;
    result.style.color="blue";
    return;
  }

  essais++;

  if(guess===solution){
    result.innerHTML = `🎉 Bravo ! Tu as trouvé ${solution} en ${essais} essais ! 🏆`;
    result.style.color="green";
    solution=null;
    essais=0;
    document.getElementById("guess").value="";
  } else if(guess<solution){
    result.innerHTML = `⬆️ Trop petit ! Essai #${essais}`;
    result.style.color="orange";
  } else {
    result.innerHTML = `⬇️ Trop grand ! Essai #${essais}`;
    result.style.color="orange";
  }

  // animation pulse
  result.style.transition="transform 0.2s";
  result.style.transform="scale(1.1)";
  setTimeout(()=>{ result.style.transform="scale(1)"; },200);
}
function resoudreSysteme3() {
  // Récupération des coefficients
  let M = [
    [Number(document.getElementById("a1_3").value), Number(document.getElementById("a2_3").value), Number(document.getElementById("a3_3").value), Number(document.getElementById("b1_3").value)],
    [Number(document.getElementById("c1_3").value), Number(document.getElementById("c2_3").value), Number(document.getElementById("c3_3").value), Number(document.getElementById("b2_3").value)],
    [Number(document.getElementById("d1_3").value), Number(document.getElementById("d2_3").value), Number(document.getElementById("d3_3").value), Number(document.getElementById("b3_3").value)]
  ];

  // Elimination de Gauss
  for(let i=0;i<3;i++){
    if(M[i][i]===0){
      document.getElementById("resultSys3").innerHTML="❌ Impossible de résoudre (pivot nul)";
      document.getElementById("resultSys3").style.color="red";
      return;
    }
    for(let j=i+1;j<3;j++){
      let f = M[j][i]/M[i][i];
      for(let k=i;k<4;k++){
        M[j][k]-=f*M[i][k];
      }
    }
  }

  // Remontée
  let Z = M[2][3]/M[2][2];
  let Y = (M[1][3]-M[1][2]*Z)/M[1][1];
  let X = (M[0][3]-M[0][2]*Z-M[0][1]*Y)/M[0][0];

  const result = document.getElementById("resultSys3");
  result.innerHTML = `✅ X=${X.toFixed(2)}, Y=${Y.toFixed(2)}, Z=${Z.toFixed(2)}`;
  result.style.color = "green";
}
function resoudreSysteme3() {
  let M = [
    [Number(document.getElementById("a1_3").value), Number(document.getElementById("a2_3").value), Number(document.getElementById("a3_3").value), Number(document.getElementById("b1_3").value)],
    [Number(document.getElementById("c1_3").value), Number(document.getElementById("c2_3").value), Number(document.getElementById("c3_3").value), Number(document.getElementById("b2_3").value)],
    [Number(document.getElementById("d1_3").value), Number(document.getElementById("d2_3").value), Number(document.getElementById("d3_3").value), Number(document.getElementById("b3_3").value)]
  ];

  // Élimination de Gauss
  for(let i=0;i<3;i++){
    if(M[i][i]===0){
      document.getElementById("resultSys3").innerHTML="❌ Impossible de résoudre (pivot nul)";
      document.getElementById("resultSys3").style.color="red";
      return;
    }
    for(let j=i+1;j<3;j++){
      let f = M[j][i]/M[i][i];
      for(let k=i;k<4;k++){
        M[j][k]-=f*M[i][k];
      }
    }
  }

  // Remontée
  let Z = M[2][3]/M[2][2];
  let Y = (M[1][3]-M[1][2]*Z)/M[1][1];
  let X = (M[0][3]-M[0][2]*Z-M[0][1]*Y)/M[0][0];

  const result = document.getElementById("resultSys3");
  result.innerHTML = `✅ X=${X.toFixed(2)}, Y=${Y.toFixed(2)}, Z=${Z.toFixed(2)}`;
  result.style.color = "green";
}
