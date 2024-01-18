AFRAME.registerComponent("enemy-bullet",{
    init:function(){
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet:function(){
        var enemyMonster = document.querySelectorAll(".ogres")

        for(var i = 0; i < enemyMonster.length; i++){
            var fireball = document.createElement("a-entity");
            fireball.setAttribute("geometry",{primitive: "sphere", radius: 0.2})
            fireball.setAttribute("material",{color: "#FF4500"})
            fireball.setAttribute("class","fireball")
            fireball.setAttribute("dynamic-body",{shape: "sphere",mass: 0})

            var position = enemyMonster[i].getAttribute("position");
            fireball.setAttribute("position",{x: position.x+1.5, y: position.y+3.5, z: position.z})

            var enemy = fireball.object3D;
            var player = document.querySelector("#weapon").object3D
            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();

            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);

            var direction = new THREE.Vector3();
            direction.subVectors(position1,position2).normalize();
            fireball.setAttribute("velocity",direction.multiplyScalar(10));

            var scene = document.querySelector("#scene");
            scene.appendChild(fireball);

            var element = document.querySelector("#countLife");
            var playerLife = parseInt(element.getAttribute("text").value)

            fireball.addEventListener("collide",(e) => {
                if(e.detail.body.el.id == "weapon"){
                    if(playerLife > 0){
                        playerLife -= 1
                        element.setAttribute("text",{value: playerLife})
                    }
                    if(playerLife <= 0){
                        var text = document.querySelector("#over")
                        text.setAttribute("visible",true)
                        var fireballel = document.querySelectorAll(".fireball")
                        for(var i = 0; i < fireballel.length; i++){
                            scene.removeChild(fireballel[i])
                        }
                    }
                }
            })

        }
    }
})