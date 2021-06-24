



function updateBox(b, MARKETSOLUTION, EXXARR, SELECTED, MARKETSOLUTIONPATH, CENTRALSOLUTION, GRADARR) {

  console.log(MARKETSOLUTIONPATH);

  b.clear();
  b.SHOWGRIDX(0.5);
  b.SHOWGRIDY(0.5);
  b.showAxes(15);
  
  // REDRAW EXXARR
  for (let i = 0; i < EXXARR.length-1; i++) {
    let val0 = {'x':EXXARR[i].p[0],'y':EXXARR[i].p[1]};
    let val1 = {'x':EXXARR[i+1].p[0],'y':EXXARR[i+1].p[1]};
    b.CONNECTVALUES(val0, val1, '#ffcc00ff', 1);
  }
  
  if (GRADARR) {
  // REDRAW GRADARR
  for (let i = 0; i < GRADARR.length; i++) {
    let val0 = {'x':GRADARR[i].p[0],'y':GRADARR[i].p[1]};
    b.SHOWVALUE(val0, '#ffcc00ff', 2);
    let val1 = {'x':(GRADARR[i].p[0]+GRADARR[i].grad[0]),'y':(GRADARR[i].p[1]+GRADARR[i].grad[1])};
    b.CONNECTVALUES(val0, val1, '#ffcc00ff', 1);
  }
  }
  
  // REDRAW MARKETSOLUTION
  b.SHOWVALUE({'x':MARKETSOLUTION.price.p[0],'y':MARKETSOLUTION.price.p[1]}, '#ffcc00ff', 5);
  
  // REDRAW SOLUTION PATH
  if (MARKETSOLUTIONPATH) {
   for (let i = 0; i < MARKETSOLUTIONPATH.length-1; i++) {
    let val0 = {'x':MARKETSOLUTIONPATH[i][0],'y':MARKETSOLUTIONPATH[i][1]};
    b.SHOWVALUE(val0, '#ff0000', 2);
    let val1 = {'x':MARKETSOLUTIONPATH[i+1][0],'y':MARKETSOLUTIONPATH[i+1][1]};
    b.CONNECTVALUES(val0, val1, '#ff0000', 1);
   }
  }



  // REDRAW CENTRAL SOLUTION
  console.log(CENTRALSOLUTION);
  b.SHOWVALUE({'x':CENTRALSOLUTION.solution_a.p[0], 'y':CENTRALSOLUTION.solution_a.p[1]}, '#c2d6d6', 5);

  // REDRAW SELECTED
  b.SHOWVALUE({'x':SELECTED.x,'y':SELECTED.y}, '#adc2eb', 3);
  
  /*
  let solution = solveMarket(alpha, beta, gamma, L, w, p);
  console.log(solution);
  for (let i = 0; i < solution.solution_path.length-1; i++) {
    
    let a0 = solution.solution_path[i];
    let a1 = solution.solution_path[i+1];
    
    let val0 = {'x':a0[0],'y':a0[1]};
    let val1 = {'x':a1[0],'y':a1[1]};
    if (i === 0) {
      b.SHOWVALUE(val0, "#f00", 2);
    }
    b.SHOWVALUE(val1, "#f00", 2);
    b.CONNECTVALUES(val0, val1, "#f00", 1);
  }
  */

/*
  let str = 'p0,p1,exx';
  for (let i = 0; i < exxArr.length; i++) {
    //console.log(exxArr[i].p1/exxArr[i].p0);
    str += '\n' + exxArr[i].p0 + ',' + exxArr[i].p1 + ',' + exxArr[i].exx;
  }
  let a = document.createElement('a');
	a.href = 'data:,' + encodeURI(str); // this really is key
	a.target = '_blank';
  a.download = 'rexx_data.csv';
  //a.click();
  a.remove();
  


  */
}; 