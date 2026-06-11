export const POPULAR_NAMES = [
  'James','John','Robert','Michael','William','David','Richard','Joseph','Thomas','Charles',
  'Christopher','Daniel','Matthew','Anthony','Mark','Donald','Steven','Paul','Andrew','Joshua',
  'Kenneth','Kevin','Brian','George','Timothy','Ronald','Edward','Jason','Jeffrey','Ryan',
  'Jacob','Gary','Nicholas','Eric','Jonathan','Stephen','Larry','Justin','Scott','Brandon',
  'Benjamin','Samuel','Raymond','Gregory','Frank','Alexander','Patrick','Jack','Dennis','Jerry',
  'Mary','Patricia','Jennifer','Linda','Barbara','Elizabeth','Susan','Jessica','Sarah','Karen',
  'Lisa','Nancy','Betty','Margaret','Sandra','Ashley','Dorothy','Kimberly','Emily','Donna',
  'Michelle','Carol','Amanda','Melissa','Deborah','Stephanie','Rebecca','Sharon','Laura','Cynthia',
  'Kathleen','Amy','Angela','Shirley','Anna','Brenda','Pamela','Emma','Nicole','Helen',
  'Samantha','Katherine','Christine','Debra','Rachel','Carolyn','Janet','Catherine','Maria','Heather',
  'Noah','Liam','Oliver','Elijah','Lucas','Mason','Logan','Ethan','Aiden','Jackson',
  'Sebastian','Mateo','Jack','Owen','Theodore','Aiden','Henry','Lucas','Alexander','William',
  'Olivia','Emma','Ava','Charlotte','Sophia','Amelia','Isabella','Mia','Evelyn','Harper',
  'Luna','Camila','Gianna','Elizabeth','Eleanor','Ella','Abigail','Sofia','Avery','Scarlett',
  'Sofia','Aria','Grace','Chloe','Penelope','Layla','Riley','Zoey','Nora','Lily',
  'Muhammad','Ahmed','Ali','Omar','Hassan','Ibrahim','Yusuf','Khalid','Abdullah','Tariq',
  'Fatima','Aisha','Zainab','Maryam','Khadijah','Hafsa','Amina','Noor','Layla','Sara',
  'Wei','Fang','Min','Jing','Xin','Lei','Yang','Li','Chen','Zhang',
  'Arjun','Vikram','Rahul','Priya','Anjali','Deepa','Kavya','Pooja','Neha','Shreya',
  'Lucas','Gabriel','Matheus','Pedro','Felipe','Rafael','Rodrigo','Bruno','Diego','Carlos',
  'Alejandro','Santiago','Valentina','Camila','Valeria','Isabella','Gabriela','Sofia','Daniela','Lucia',
  'Luca','Marco','Alessandro','Lorenzo','Matteo','Giovanni','Federico','Antonio','Riccardo','Davide',
  'Leon','Felix','Paul','Jonas','Tim','Lukas','Maximilian','Julian','Tobias','Moritz',
  'Antoine','Thomas','Nicolas','Julien','Alexandre','Baptiste','Mathieu','Guillaume','Romain','Clement',
  'Jack','Harry','George','Charlie','Oliver','Alfie','Freddie','Archie','Oscar','Henry',
  'Yuki','Haruto','Sota','Yuto','Riku','Kaito','Sora','Ren','Hayato','Hiroto',
  'Min-jun','Seo-jun','Do-yoon','Si-woo','Ji-ho','Jun-seo','Ye-jin','Ji-yeon','Soo-ah','Ha-eun',
];

export const NAME_SLUGS = POPULAR_NAMES.map(n => n.toLowerCase().replace(/\s+/g, '-'));

export function getNameMeta(name: string) {
  const cap = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  return {
    title: `${cap} Signature Style — Free Signature Generator`,
    description: `Generate a beautiful signature for the name ${cap}. Choose from 10 elegant handwriting styles. Download free as PNG. No sign-up required.`,
    h1: `Signature Generator for ${cap}`,
    intro: `Create a stunning, professional signature for the name "${cap}" instantly. Pick from 10 hand-crafted calligraphy styles, customize color and size, then download your signature as a high-quality PNG — completely free.`,
  };
}
