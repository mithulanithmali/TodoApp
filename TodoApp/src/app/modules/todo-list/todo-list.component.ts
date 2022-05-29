import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableFilter } from 'mat-table-filter';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'view-dialog-box',
  templateUrl: './view-dialog-box.html',
  styleUrls: ['./view-dialog-box.scss'],
})
export class ViewDialogBox implements OnInit {
  viewTodoList: FormGroup | any;

  constructor(
    public dialogRef: MatDialogRef<ViewDialogBox>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private todoService: TodoService,
    private _fb: FormBuilder
  ) {
    this.createForm();
  }
  createForm() {
    this.viewTodoList = this._fb.group({
      id: [{ value: '', disabled: true }],
      userId: [{ value: '', disabled: true }],
      title: [{ value: '', disabled: true }],
      completed: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    let id = this.data.id;
    this.todoService.getTodoItemById(id).subscribe((data) => {
      console.log(data);
      this.viewTodoList.patchValue(data);
    });
  }

  closeDialogBox() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todoHeader: string[] = ['id', 'userId', 'title', 'completed', 'actions'];
  filterEntity: any;
  filterType: MatTableFilter | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  tableData: MatTableDataSource<any> | any;
  showTable: boolean = false;
  constructor(private todoService: TodoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.filterEntity = {};
    console.log('this.filterEntity', this.filterEntity);
    this.filterType = MatTableFilter.ANYWHERE;
    this.todoService.getTodoList().subscribe((data) => {
      console.log(data);
      this.tableData = new MatTableDataSource(data);
      setTimeout(() => (this.tableData.paginator = this.paginator));
      // this.tableData1.paginator = this.paginator;
      this.showTable = true;
    });
  }

  openDialog(id: String) {
    console.log(id);
    let dialogRef1 = this.dialog.open(ViewDialogBox, {
      width: '700px',
      data: {
        id: id,
      },
    });

    dialogRef1.afterClosed().subscribe((result: boolean) => {});
  }
}
