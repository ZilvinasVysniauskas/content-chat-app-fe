import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@Component({
  selector: 'app-tech-investigation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule
  ],
  templateUrl: './tech-investigation.component.html',
  styleUrls: ['./tech-investigation.component.scss']

})
export class TechInvestigationComponent {

  editorOptions = {theme: 'vs-dark', language: 'java', dimension: { height: 10000, width: 10000}};
  code: string= `
  package org.example;

import org.junit.jupiter.api.Test;
import org.reflections.Reflections;
import org.reflections.util.ClasspathHelper;
import org.reflections.util.ConfigurationBuilder;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class MainTest {

    @Test
    void createdClassesExtendsPersonClass() {
        Reflections reflections = new Reflections("org.example.extensions");
        Set<Class<? extends Person>> classes = reflections.getSubTypesOf(Person.class);

        assertEquals(3, classes.size(), "Expected exactly two classes extending Person in the package");
    }


}
  `;


  onCodeChange(newCode: string) {
    // Perform actions or logic when the code changes
    console.log('Code changed:', newCode);
  }
}
