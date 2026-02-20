// src/app/pages/todo/create-task.ts

import { CreateTheConnectionLocal, LocalSyncData, MakeTheInstanceConceptLocal, PatcherStructure, PRIVATE, UpdateComposition } from "mftsccs-browser";
import { StatefulWidget } from "mftsccs-browser";
import './todo.style.css';
import { getLocalUserId } from "../user/login.service";

export class create extends StatefulWidget {

    after_render(): void {
        let userId: number = getLocalUserId();
        let order: number = 1;

        let titleInput = this.getElementById("title") as HTMLInputElement;
        let descInput = this.getElementById("description") as HTMLTextAreaElement;
        let idInput = this.getElementById("id") as HTMLInputElement;

        // Pre-fill for edit mode
        if (this.data) {
            titleInput.value = this.data.title || "";
            descInput.value = this.data.description || "";
            idInput.value = this.data.id || "";
        }

        let submitButton = this.getElementById("submit");
        if (submitButton) {
            submitButton.onclick = (ev: Event) => {
                ev.preventDefault();

                const title = titleInput.value.trim();
                const description = descInput.value.trim();

                if (!title) {
                    alert("Title is required!");
                    return;
                }

                if (idInput.value) {
                    // Update existing task
                    let patcher: PatcherStructure = new PatcherStructure();
                    patcher.compositionId = Number(idInput.value);
                    patcher.patchObject = {
                        title: title,
                        description: description
                    };
                    UpdateComposition(patcher).then(() => {
                        LocalSyncData.SyncDataOnline();
                        console.log("Task updated");

                        // 1. Clear the internal data so the widget "forgets" it's in Edit Mode
                        this.data = null; 
                        // 2. Clear the actual HTML elements (immediate feedback)
                        titleInput.value = "";
                        descInput.value = "";
                        idInput.value = "";
                        this.render(); 
                    });
                } else {
                    // Create new task
                    MakeTheInstanceConceptLocal("the_todo", "", true, userId, PRIVATE).then((mainConcept) => {
                        MakeTheInstanceConceptLocal("title", title, false, userId, PRIVATE).then((titleConcept) => {
                            MakeTheInstanceConceptLocal("description", description || "", false, userId, PRIVATE).then((descConcept) => {
                                MakeTheInstanceConceptLocal("completed", "false", false, userId, PRIVATE).then((completedConcept) => {
                                    // Link fields to main task composition
                                    CreateTheConnectionLocal(mainConcept.id, titleConcept.id, mainConcept.id, order, "", userId).then(() => {
                                        CreateTheConnectionLocal(mainConcept.id, descConcept.id, mainConcept.id, order + 1, "", userId).then(() => {
                                            CreateTheConnectionLocal(mainConcept.id, completedConcept.id, mainConcept.id, order + 2, "", userId).then(() => {
                                                LocalSyncData.SyncDataOnline();
                                                console.log("New task created");
                                                // Optional: clear form or notify list to refresh
                                                titleInput.value = "";
                                                descInput.value = "";
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
            };
        }
    }

    getHtml(): string {
        const buttonLabel = this.data ? "Update Task" : "Save Task";
        return `
        <div class="container">
            <form>
                <input type="hidden" id="id">
                <div class="formbody">
                    <label>Title *</label>
                    <input type="text" id="title" placeholder="Enter task title" required>
                </div>
                <div class="formbody">
                    <label>Description</label>
                    <textarea id="description" placeholder="Optional details..." rows="5"></textarea>
                </div>
                <button class="btn btn-primary" id="submit" type="submit">${buttonLabel}</button>
            </form>
        </div>`;
    }
}