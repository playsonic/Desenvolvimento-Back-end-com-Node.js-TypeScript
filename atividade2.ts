
//questão 1

//1.1 -

function sum(x: number, y: number) {

    return x + y;

}

console.log(sum(4,5));


function greetUser(firstName: string, lastName: string, age:number, hometown: string) {

    let fullName = `${lastName} ${firstName}`;

    console.log(

        `Hello, your name is ${fullName}.`,

        `You are ${age} years old.`,

        `And you live in ${hometown}.`

    );
}

greetUser("Kira", "Yoshikage", 33, "Morioh");


//1.2 -

class Dog {
    constructor(
        private _name: string,
        private _age: number,
        private _isAlive: boolean,
        private _owners: Array <string>,
    ) {}


    public get name() {
        return this._name;
    }

    public get age() {
        return this._age;
    }

    public get alive() {
        return this._isAlive;
    }

    public get owners() {
        return this._owners;
    }
    
    public bark() {
        return console.log('Hof hof!');
    } 

}

const iggy = new Dog( 'Iggy', 12, true, ['Avdol', 'Joseph']);
iggy.bark()

console.log(iggy);


    enum type {Bug, Dragon, Electric, Fighting, Fire, Flying, Ghost, Grass, Ground, Ice, Normal, Poison, Psychic, Rock, Water}

    enum specie {normal, mythical, pseudo_legendary, legendary}

    class pokemon {

    constructor (
            public name: string,
            public type: type,
            public specie: specie,
            public height: number,
            public weight: number,
            public abilities: Array<string>,
            public stats: { hp: number; attack: number; defense: number; special: { attack: number; defense: number }; speed: number; }
        ) {}

            public attack() {
                const randomIndex: number = Math.floor(
                
                Math.random() * this.abilities.length);
                    
                console.log(`${this.name} used ${this.abilities[randomIndex]}!`);
  
    };
}

const arcanine = new pokemon(
  'Arcanine', type.Fire, specie.pseudo_legendary, 1.9, 155.0, ['Intimidate', 'Flash Fire'], {hp: 290, attack: 202, defense: 148, special: { attack: 184, defense: 148 }, speed: 175}
);

console.log(arcanine);


//1.3

interface personinfo {
firstName: string,
lastName: string,
age: number,
alive: boolean,
nickname: string,
work: string,
greet(): undefined,
}


type personinfoA = Omit<personinfo, 'nickname'>;

function gonInfo(): personinfoA {
  return {
    firstName: 'Gon',
    lastName: 'Freecs',
    age: 14,
    alive: true,
    work: 'Hunter',
    greet() {console.log('Hello, my name is Gon!');}
  };
}

type personinfoB = Omit<personinfo, 'work'>;

function Okaruninfo(): personinfoB {
  return {
    firstName: 'Takakura',
    lastName: 'Ken',
    age: 14,
    nickname: 'Okarun',
    alive: true,
    greet() {console.log('Hello my name is Ken Takakura!');}
  };
}

const gon = gonInfo();
const Okarun = Okaruninfo();


console.log(gon);
console.log(Okarun);


/* npm run dev – é um dos comandos possíveis que executa o arquivo TypeScript através do Node.js.

npm init – serve para iniciar um novo projeto no Node.js, ele cria um JSON com as informações que colocamos; esse JSON permite que a gente use o Node.js.

npx tsc --init – cria um arquivo chamado tsconfig.json.

src/main.ts – é o nome do arquivo TypeScript.

npm install -D @types/node – instala as tipagens que permitem que certas versões do Node.js consigam rodar o TypeScript.

tsconfig.json – este arquivo configura o compilador TypeScript.

4 – Interface é mais estruturada, porém é mais restrita, pois não consegue representar tipos de parâmetros primitivos, sendo usada para descrever a forma de um objeto.

Type pode representar qualquer tipo válido do TypeScript, sendo por isso mais flexível e, muitas vezes, mais simples do que interface.

5 – é para explicitar que esse parâmetro que está sendo trabalhado é privado, já que ele funciona de forma diferente da propriedade pública. Então, em códigos longos, ter um indicativo ajuda a facilitar nossa identificação.

6 – é para deixar um parâmetro opcional, não sendo necessário colocá-lo no TypeScript.

7 – o “?” deixa um parâmetro opcional, não sendo necessário colocá-lo. O “|” faz verificação do valor; ele pode existir com um valor x ou como undefined.

8 – o TypeScript resolve vários problemas do JavaScript, por exemplo: problemas de tipagem/propriedades em códigos longos. Além disso, ele garante uma melhor estabilidade, mas tem problemas para configurações de projetos, principalmente no Node.js.

*/