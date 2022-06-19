import { Component, OnInit } from '@angular/core';


interface Resource{
  title:string,
  image:string,
  shortDescription:string
}
@Component({
  selector: 'app-information-page',
  templateUrl: './information-page.component.html',
  styleUrls: ['./information-page.component.scss']
})
export class InformationPageComponent implements OnInit {


  resources:Resource[]=[];

  aboutUsText:string="";
  constructor() { }

  ngOnInit(): void {
    this.getRosources();

    this.getAboutUsText();
  }
  

  private getRosources(){
    this.resources=[
      {
        title:'Angular',
        image:'../../assets/images/resource_picture/angular_post.png',
        shortDescription:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, quod maiores. Excepturi harum libero fuga assumenda delectus. Odio sed enim fuga deserunt blanditiis et illo veritatis ducimus. Dolores, culpa corporis. 44444 Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quisquam impedit voluptate ut nobis optio cumque tempora assumenda, voluptatibus consectetur ipsam quibusdam nemo aliquid et nostrum ducimus quasi, distinctio nisi. THE END!!!!'
      },
      {
        title:'ASP.NET CORE',
        image:'../../assets/images/resource_picture/aspNetCore_post.jpg',
        shortDescription:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, quod maiores. Excepturi harum libero fuga assumenda delectus. Odio sed enim fuga deserunt blanditiis et illo veritatis ducimus. Dolores, culpa corporis. 44444 Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quisquam impedit voluptate ut nobis optio cumque tempora assumenda, voluptatibus consectetur ipsam quibusdam nemo aliquid et nostrum ducimus quasi, distinctio nisi. THE END!!!!'
      },
      {
        title:'Entity Framework',
        image:'../../assets/images/resource_picture/entity_code_firts_logo.png',
        shortDescription:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, quod maiores. Excepturi harum libero fuga assumenda delectus. Odio sed enim fuga deserunt blanditiis et illo veritatis ducimus. Dolores, culpa corporis. 44444 Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quisquam impedit voluptate ut nobis optio cumque tempora assumenda, voluptatibus consectetur ipsam quibusdam nemo aliquid et nostrum ducimus quasi, distinctio nisi. THE END!!!!'
      },
      {
        title:'git hub',
        image:'../../assets/images/resource_picture/gitHub_logo_2.png',
        shortDescription:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, quod maiores. Excepturi harum libero fuga assumenda delectus. Odio sed enim fuga deserunt blanditiis et illo veritatis ducimus. Dolores, culpa corporis. 44444 Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quisquam impedit voluptate ut nobis optio cumque tempora assumenda, voluptatibus consectetur ipsam quibusdam nemo aliquid et nostrum ducimus quasi, distinctio nisi. THE END!!!!'
      },
      {
        title:'tailwind',
        image:'../../assets/images/resource_picture/tailwind_post.png',
        shortDescription:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, quod maiores. Excepturi harum libero fuga assumenda delectus. Odio sed enim fuga deserunt blanditiis et illo veritatis ducimus. Dolores, culpa corporis. 44444 Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quisquam impedit voluptate ut nobis optio cumque tempora assumenda, voluptatibus consectetur ipsam quibusdam nemo aliquid et nostrum ducimus quasi, distinctio nisi. THE END!!!!'
      },
      {
        title:'tailwind',
        image:'../../assets/images/resource_picture/tailwind_post.png',
        shortDescription:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, quod maiores. Excepturi harum libero fuga assumenda delectus. Odio sed enim fuga deserunt blanditiis et illo veritatis ducimus. Dolores, culpa corporis. 44444 Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quisquam impedit voluptate ut nobis optio cumque tempora assumenda, voluptatibus consectetur ipsam quibusdam nemo aliquid et nostrum ducimus quasi, distinctio nisi. THE END!!!!'
      }
    ]
  }

  getAboutUsText() {
    this.aboutUsText="I am a junior developer. I have been studying tech technology at IT Academy for two years. During this time, I have got basic, but solid knowledge of OOP, SQL Database, C#, .Net, and Angular. It is not too much but I am sure that I am ready to try something bigger. I have a lot of energy and enthusiasm to acquire new information every single day.";
  }

  

}
