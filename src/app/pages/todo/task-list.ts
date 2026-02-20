// src/app/pages/todo/task-list.ts

import { DeleteConceptById, GetCompositionListListener, NORMAL, PatcherStructure, UpdateComposition, LocalSyncData } from "mftsccs-browser";
import { StatefulWidget } from "mftsccs-browser";
import { getLocalUserId } from "../user/login.service";
import './todo.style.css';

export class list extends StatefulWidget {
    mytodos: any[] = [];
    inpage: number = 20;
    page: number = 1;
    linker: string = "console_folder_s";

    before_render(): void {
        let userId: number = getLocalUserId();
        GetCompositionListListener("the_todo", userId, this.inpage, this.page, NORMAL).subscribe((output: any) => {
            this.mytodos = output || [];
            console.log("Loaded todos:", this.mytodos);
            this.render();
        });
    }

    after_render() {
        let tableBody = this.getElementById("mainbody") as HTMLTableSectionElement;
        if (tableBody) {
            tableBody.innerHTML = ""; // Clear previous rows

            if (this.mytodos.length > 0) {
                this.mytodos.forEach((todo: any) => {
                    let id = todo.the_todo?.id;
                    if (!id) return;

                    let row = document.createElement("tr");

                    // Title
                    let tdTitle = document.createElement("td");
                    tdTitle.textContent = todo.the_todo.title || "(No title)";

                    // Description
                    let tdDesc = document.createElement("td");
                    tdDesc.textContent = todo.the_todo.description || "-";

                    // Completed (checkbox)
                    let tdCompleted = document.createElement("td");
                    let checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.checked = todo.the_todo.completed === "true";
                    checkbox.onclick = () => {
                        let patcher = new PatcherStructure(); // Assuming you import it
                        patcher.compositionId = Number(id);
                        patcher.patchObject = { completed: checkbox.checked ? "true" : "false" };
                        UpdateComposition(patcher).then(() => LocalSyncData.SyncDataOnline());
                    };
                    tdCompleted.appendChild(checkbox);

                    // Actions
                    let tdActions = document.createElement("td");

                    let editBtn = document.createElement("button");
                    editBtn.className = "btn btn-primary";
                    editBtn.textContent = "Edit";
                    editBtn.onclick = () => {
                        this.data = {
                            id: id,
                            title: todo.the_todo.title,
                            description: todo.the_todo.description
                        };
                        this.notify(); // Triggers update in create form
                    };

                    let delBtn = document.createElement("button");
                    delBtn.className = "btn btn-primary";
                    delBtn.textContent = "Delete";
                    delBtn.onclick = () => {
                        if (confirm("Delete this task?")) {
                            DeleteConceptById(id).then(() => {
                                console.log("Task deleted");
                                this.before_render(); // Refresh list
                            });
                        }
                    };

                    tdActions.append(editBtn, delBtn);

                    row.append(tdTitle, tdDesc, tdCompleted, tdActions);
                    tableBody.appendChild(row);
                });
            } else {
                tableBody.innerHTML = '<tr><td colspan="4">No tasks yet. Add one above!</td></tr>';
            }
        }
    }

    getHtml(): string {
        return `
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="mainbody"></tbody>
            </table>
        </div>`;
    }
}