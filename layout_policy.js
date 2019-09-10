function LayoutPolicy(){

    this.ratio=1;

    this.POLICIES={
        "PARALLEL_PERCENTAGE":"parallelPercentage",
        "MIXED_PERCENTAGE":"mixedPercentage"
    };

    this.STRAIRS_WIDTH=13; //Feet
    this.STRAIR_PLACEMENT_GAP=150;


    /**
     * apply percentage Layout plicy to create ordered building

     * @return {void}
     */

    this.applyPercentageLayoutPolicy= function (typesAndPercentage,point,w,angle,shapesHolder){
        // @TODO
    };



    this.transformToAlign= function transformToAlign(columnNode,point){
        let shape=columnNode.shape;
        let p=getPoint(point.x,point.y,columnNode.d,angle);
        let ts=`t${p.x-shape.attrs.x},${((p.y-shape.attrs.y))} r${angle},${shape.attrs.x},${shape.attrs.y}`;
        shape.transform(ts);
    };



   this.transformColumnToAlign= function (col){
       let topSP=getPoint(cx,cy,(h+g),-90+angle);
       let bottomSP=getPoint(cx,cy,5,90+angle);
       this.transformToAlign(col.top,topSP);
       this.transformToAlign(col.bottom,bottomSP);
    };

    this.transformAllToAlign=function (){
        for (let property in shapesHolder) {
           this.transformColumnToAlign(shapesHolder[property]);
        }
    };

    /**
     * apply parallel layout plicy to create ordered building
     * @param {typesAndPercentage} is type and percentage space required for building type
     * @param  {point} point.x and point.y as int value to represent x co-ordnidate and y co-ordinate
     * @param  {w} int value to represent total width
     * @param  {angle} angle  value to represent angle
     * @param  {shapesHolder} containing previous shapes
     * @return {void}
     */

    this.applyParallelLayoutPolicy= function (typesAndPercentage,point,w,angle,shapesHolder){
        removeAllShape(shapesHolder);
        
        let stairsPlacementX=this.STRAIR_PLACEMENT_GAP*this.ratio;

        let pRatio= Math.floor(w/100); // pixel ratio

        let column=1;

        let topSP=getPoint(point.x,point.y,(h+g),-90+angle);

        let bottomSP=getPoint(point.x,point.y,5,90+angle);

        let lr=0; //last r  or last created distance        
        for (let property in typesAndPercentage) {
        
            let type=typesAndPercentage[property].type;
        
            let percentage=typesAndPercentage[property].percentage;
        
            let r=0;// Radius 
        
            for( ;r<percentage*pRatio && lr+r+type.w<w;r+=type.w){
                if(lr+r>stairsPlacementX){
                   lr+= this.STRAIRS_WIDTH;
                   stairsPlacementX=lr+r+this.STRAIR_PLACEMENT_GAP*this.ratio;
                }
                buildingFactory.create(shapesHolder,topSP,bottomSP, h, g, angle,type,column,lr+r);
                column++;
            }
            lr+=r;
        }

      this.transformAllToAlign();
    };
    /**
     * apply plicy to create ordered building
     * @param  {policyName} policy Name
     * @param  {typesAndPercentage} types type and percentage object expected structure will[{"type":"percentage"}]
     * @param  {cx} int value to represent x co-ordnidate
     * @param  {cy} int value to represent y co-ordinate
     * @param  {w} int value to represent total width
     * @param  {angle} angle  value to represent angle
     * @param  {shapesHolder} containing previous shapes
     *
     * @return {void}
     */
    this.applyLayoutPolicy= function (policyName  ,typesAndPercentage,point,w,angle,shapesHolder){
        switch (policyName) {
            case this.POLICIES.PARALLEL_PERCENTAGE:
                this.applyParallelLayoutPolicy(typesAndPercentage,point,w,angle,shapesHolder);
                break;
            case this.POLICIES.MIXED_PERCENTAGE:
                this.applyPercentageLayoutPolicy(typesAndPercentage,point,w,angle,shapesHolder);
                break;
        };
    }
}
