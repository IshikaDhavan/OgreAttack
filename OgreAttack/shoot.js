AFRAME.registerComponent("shoot",{
    init:function(){
        this.shootbullet();
    },
    shootbullet:function(){
        window.addEventListener("keydown",(e) => {
            if(e.key === "z"){
                var bullet = document.createElement("a-entity")

                bullet.setAttribute("geometry",{primitive: "sphere", radius: 0.2})
                bullet.setAttribute("material","color","black")
                bullet.setAttribute("dynamic-body",{})
                bullet.setAttribute("visible",true);

                var cam = document.querySelector("#camera-rig")
                pos = cam.getAttribute("position")

                bullet.setAttribute("position",{
                    x: pos.x, y: pos.y+1.6, z: pos.z-4.4
                })

                var camera = document.querySelector("#camera").object3D;

                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction)

                bullet.setAttribute("velocity", direction.multiplyScalar(-50));

                var scene = document.querySelector("#scene")

                bullet.setAttribute("dynamic-body",{})
                bullet.setAttribute("visible",true);

                bullet.addEventListener("collide", this.removeBullet);
                scene.appendChild(bullet)
                this.shootSound()
            }
        })
    },
    removeBullet:function(e){
        var scene = document.querySelector("#scene")

        //bullet
        var element = e.detail.target.el;

        //element which is hit
        var elementhit = e.detail.body.el;

        if(elementhit.id.includes("ogre")){
            var countMonster = document.querySelector("#countMonster")
            var monsterFired = parseInt(countMonster.getAttribute("text").value);
            monsterFired -= 1;

            countMonster.setAttribute("text",{
                value: monsterFired
            })

            if(monsterFired === 0){
                var text = document.querySelector("#completed")
                text.setAttribute("visible", true)
            }
            scene.removeChild(elementhit)
        }

        element.removeEventListener("collide", this.removeBullet);

        scene.removeChild(element)

    },
    shootSound:function(){
        var entity = document.querySelector("#sound2");
        entity.components.sound.playSound();
    }
})