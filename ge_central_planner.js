function showCentrallyPlannedSolution(alpha, beta, gamma, L) {
 
  let solutions = solveCentralPlanner(alpha, beta, gamma, L);

  // [alpha, beta, gamma, L] = [0.5, 0.5, 1.1, 24]
  // [n1, n2, n, b, k, x, u] = [2.0154, 6.8701875, 8.8855875]
  // a price that works here is 2.84, 3.37, but lots of other prices work too , so i am confused

  let n_decimal_placed = 4;
  
  // THE N0>=SOLUTION
  solution_n1.innerHTML = (solutions.solution_a.n1).toFixed(n_decimal_placed);
  solution_n2.innerHTML = (solutions.solution_a.n2).toFixed(n_decimal_placed);
  solution_n.innerHTML = (solutions.solution_a.n).toFixed(n_decimal_placed);
  solution_b.innerHTML = (solutions.solution_a.b).toFixed(n_decimal_placed);
  solution_k.innerHTML = (solutions.solution_a.k).toFixed(n_decimal_placed);
  solution_x.innerHTML = (solutions.solution_a.x).toFixed(n_decimal_placed);
  solution_u.innerHTML = (solutions.solution_a.u).toFixed(n_decimal_placed);

  // THE N0=0 SOLUTION
  solution_b_n0.innerHTML = (solutions.solution_b.n0).toFixed(n_decimal_placed);
  solution_b_n1.innerHTML = (solutions.solution_b.n1).toFixed(n_decimal_placed);
  solution_b_n.innerHTML = (solutions.solution_b.n).toFixed(n_decimal_placed);
  solution_b_b.innerHTML = (solutions.solution_b.b).toFixed(n_decimal_placed);
  solution_b_k.innerHTML = (solutions.solution_b.k).toFixed(n_decimal_placed);
  solution_b_x.innerHTML = (solutions.solution_b.x).toFixed(n_decimal_placed);
  solution_b_u.innerHTML = (solutions.solution_b.u).toFixed(n_decimal_placed);
}

function solveCentralPlanner(alpha, beta, gamma, L) {
  
  let A = gamma / (alpha*(1-beta));
  let B = beta / (gamma+beta);
  let c2 = A-B+1;
  let c3 = (1-B)*L;
  
  let n1 = 0;
  let exx = 9999999;
  let dx = 1;

  while (dx > 0.00001) {
    
    let x = n1 + dx;
    let ex = (-A*x**(1-alpha) - c2*x + c3)**2;
    if (ex < exx) {
      exx = ex;
      n1 = x;
      continue;
    }
     
    x = n1 - dx;
    ex = (-A*x**(1-alpha) - c2*x + c3)**2;
    if (ex < exx) {
      exx = ex;
      n1 = x;
      continue;
    }
     
    dx = dx/10;
    
  }
  
  let n2 = B*(L-n1);
  let n = n1 + n2;
  let b = L - n;
  let k = n1**alpha;
  let x = n2**beta*(k+1)**(1-beta);
  let u = Math.log(x, Math.E) + gamma*Math.log(b, Math.E);
  
  let solution_a = {
   'n1':n1,
   'n2':n2,
   'n':n,
   'b':b,
   'k':k,
   'x':x,
   'u':u
  }
  
  // assume n0 = 0
  
  let solution_b = {
   'n0':0,
   'n1':beta*L/(gamma+beta),
   'n':beta*L/(gamma+beta),
   'b':L-beta*L/(gamma+beta),
   'k':0,
   'x':(beta*L/(gamma+beta))**beta
  }
  solution_b.u = Math.log(solution_b.x, Math.E) + gamma*Math.log(solution_b.b, Math.E);
  
  return {
    'solution_a':solution_a,
    'solution_b':solution_b
  }
  

}