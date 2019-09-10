function BuildingFactory(ratio=1) {

    this.buildingTypes= {
        "STUDIO": { w: 15*ratio,  color: '#228B22'  },
        "ONE_BHK": { w: 20*ratio, color: '#32CD32'  },
        "TWO_BHK": { w: 30*ratio, color: '#00FF00'  },
        "THREE_BHK": { w: 40*ratio,color: '#FFFF99' }
    };


    this.create = function (shapesHolder,topSP,bottomSP, h, g, angle,type,column,d) {
         this.createColumn(shapesHolder,topSP,bottomSP,  h, g, angle,type,column,d)
    };

    this.createColumn =function (shapesHolder,topSP,bottomSP,h, g, angle,type,column,d) {
        shapesHolder[column]={
            "type":"building",
            "top":{shape:this.createBuilding(topSP.x,topSP.y,column,type,h), d:d    },
            "bottom":{ shape:this.createBuilding(bottomSP.x,bottomSP.y,column,type,h),d:d }
        };
    };

    this.createBuilding=  function (x,y,index,type,h) {
        return paper.rect(x,y,type.w,h).attr({ 'fill': type.color,'stroke-width': .1});
    };
}
