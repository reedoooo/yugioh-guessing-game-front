import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const Confetti = () => {
  const myRef = useRef();

  useEffect(() => {
    let myP5 = new p5(Sketch, myRef.current);

    return () => {
      myP5.remove();
    };
  }, []);

  let Sketch = (p) => {
    let nouvelle, ancienne, pression;
    let themeCouleur = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
      '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
      '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
      '#FF5722'
    ];
    let confettis;

    class SystemeDeParticules {
      constructor(num, position) {
        this.confettis = [];

        for (let i = 0; i < num; i++) {
          const couleur = themeCouleur[p.floor(p.random(themeCouleur.length))];
          const position = p.createVector(
            p.random(p.width),
            p.random(p.height)
          );
          const vitesse = p.createVector(
            p.random(-1, 1),
            p.random(-1, 1)
          );
          const taille = p.random(10, 30);
          this.confettis.push(new ConfettiElement(couleur, position, vitesse, taille));
        }
      }

      rendu() {
        for (let i = 0; i < this.confettis.length; i++) {
          const confetti = this.confettis[i];
          confetti.update();
          confetti.display();
        }
      }
    }

    class ConfettiElement {
      constructor(couleur, position, vitesse, taille) {
        this.couleur = couleur;
        this.position = position;
        this.vitesse = vitesse;
        this.taille = taille;
      }

      update() {
        this.position.add(this.vitesse);

        if (pression) {
          const direction = p.createVector(p.mouseX, p.mouseY).sub(this.position).normalize();
          this.vitesse.add(direction.mult(0.05));
        }

        this.vitesse.mult(0.95);
        this.position.add(this.vitesse);

        if (this.position.x > p.width + this.taille) {
          this.position.x = -this.taille;
        } else if (this.position.x < -this.taille) {
          this.position.x = p.width + this.taille;
        }

        if (this.position.y > p.height + this.taille) {
          this.position.y = -this.taille;
        } else if (this.position.y < -this.taille) {
          this.position.y = p.height + this.taille;
        }
      }

      display() {
        p.push();
        p.translate(this.position.x, this.position.y);
        p.rotate(p.frameCount * 0.05);
        p.rectMode(p.CENTER);
        p.noStroke();
        p.fill(this.couleur);
        p.rect(0, 0, this.taille, this.taille);
        p.pop();
      }
    }

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.frameRate(60);
      ancienne = p.createVector(0, 0);
      nouvelle = p.createVector(0, 0);
      confettis = new SystemeDeParticules(500, p.createVector(p.width / 2, -20));
    };

    p.draw = () => {
      p.background(p.color('#111'));
      nouvelle.x = p.mouseX;
      nouvelle.y = p.mouseY;
      confettis.rendu();
      ancienne.x = nouvelle.x;
      ancienne.y = nouvelle.y;
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      confettis.position = p.createVector(p.width / 2, -40);
    };

    p.mousePressed = () => {
      pression = true;
    };

    p.mouseReleased = () => {
      pression = false;
      confettis.gravite.y = 0.1;
      confettis.gravite.x = 0;
    };
  };

  return <div ref={myRef}></div>;
};

export default Confetti;
