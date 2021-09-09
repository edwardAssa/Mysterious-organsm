
// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}


//Creates an instance
const paFactory=(specimenNum,dna)=>{
  return{
    specimenNum,
    dna,
    //changes a random base of this instance's dna to another random base
    mutate(){
      const index=random(15)
      const base=dna[index];
      let newBase=base;
      while(newBase===base) newBase=returnRandBase();
      dna[index]=newBase;
    },
    //compares the dna of this instance with the dna of another given instance and prints the result
    compareDna(otherPa){
      let similar=0;
      otherPa.dna.forEach((base,index)=>{
        if(base===dna[index]) similar++;}
      )
      console.log(`Specimen ${specimenNum} and specimen ${otherPa.specimenNum} have ${(similar/15)*100}% DNA in common.`);
    },
    //compares the dna of this instance with the dna of another given instance and returns the result
    returnComparedDna(otherPa){
      let similar=0;
      otherPa.dna.forEach((base,index)=>{
        if(base===dna[index]) similar++;}
      )
      return (similar/15)*100;
    },
    //returns a boolean representing if this instance is likely going to survive
    willSurvive(){
      let cg=0;
      dna.forEach(base=>{if (base==='C'||base==='G') cg++});
      return cg/15>=0.6;
    },
    //complements the whole strand of dna
    complementStrand(){
      this.dna=dna.map(base=> swap(base))
    }
  }
}
//creates n number of surviving instances
function createSurvivingPa(n){
  let survivingPa=[];
  for(let i=0;i<n;i++){
    let pa=paFactory(i,mockUpStrand());
    while (!pa.willSurvive()) pa=paFactory(i,mockUpStrand());
    survivingPa.push(pa);
  }
  return survivingPa;
}
//displays the two instances with the most similar dna given an array of instances
function mostSimilar(pa){
  let similarity=0
  let specimen1,specimen2;
  pa.forEach((pa1)=>{
  pa.forEach((pa2)=>{ if(pa2.returnComparedDna(pa1)>similarity&&pa1.specimenNum!==pa2.specimenNum){
      similarity=pa2.returnComparedDna(pa1);
      specimen1=pa1.specimenNum;
      specimen2=pa2.specimenNum;}})})
  console.log(`The most related instances are specimen ${specimen1} and specimen ${specimen2} with ${similarity}% DNA in common!`)
}

//creates 30 surviving instances
const survivingPa=createSurvivingPa(30);
//displays the two instances with the most similar dna of the previously created 30 instances
mostSimilar(survivingPa);











