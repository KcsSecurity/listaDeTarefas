import { Component, ɵisBoundToModule__POST_R3__ } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public modo: string = "lista";
  public todos: Todo[] = [];
  public title: string = "Meu primeiro Componente";
  public form : FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      title: ["", Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    })
    this.load();
  }

  add(){
    const title = this.form.controls["title"].value;
    const id = this.todos.length +1;
    this.todos.push(new Todo(id, title, false));
    this.salvar();
    this.alterarModo("lista");
    this.clear();
  }

  salvar(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem("todos", data);
  }

  remover(todo : Todo){
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.salvar();
  }

  concluirTarefa(todo : Todo){
    todo.done = true;
    this.salvar();
  }

  refazerTarefa(todo : Todo){
    todo.done = false;
    this.salvar();
  }

  clear(){
    this.form.reset();
  }

  load(){
    const data = localStorage.getItem("todos");
    if (data !== null) {
      this.todos = JSON.parse(data);
    }else{
      this.todos = [];
    }
  }

  alterarModo(modo: string){
    this.modo = modo;
  }
}
