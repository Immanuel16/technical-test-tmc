import ImgEmptyTodo from "@/assets/images/img-empty-todo.png";
import ImgTodo from "@/assets/images/img-todo.png";
import DialogUpdate from "@/components/DialogUpdate/DialogUpdate";
import MoreMenu from "@/components/MoreMenu/MoreMenu";
import { useStore } from "@/stores/stores";
import { convertDate, convertDateToTimezone } from "@/utils/util";
import { Add, DeleteOutline, MoreVert } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";

const Home = () => {
  const now = new Date();
  const navigate = useNavigate();
  const { todos, updateTodo, userLogin } = useStore();
  const [idMenu, setIdMenu] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [todoId, setTodoId] = useState("");
  const [modalActions, setModalActions] = useState("");
  const [todo, setTodo] = useState({});

  const onClickMenu = (menuId, todoId) => {
    setIdMenu(menuId);
    setTodoId(todoId);
  };
  const onClickMenuItem = (menuId, data = {}) => {
    setIdMenu("");
    /* 1 = edit, 2 = delete, 3 = add subtodo */
    switch (menuId) {
      case 1:
        onOpenModalAdd("edit", data);
        break;
      case 2:
        deleteTodo();
        break;
      default:
        onOpenModalAdd("addSubTodo");
        break;
    }
  };

  /* open modal update */
  const onOpenModalAdd = (action = "", data = "") => {
    setOpenModal(true);
    setModalActions(action);
    if (data.id) {
      setTodo(data);
    }
  };

  /* delete sub todo */
  const deleteSubTodo = (idParent, idChild) => {
    let todoList = todos.map((todo) => {
      if (todo.id === idParent) {
        todo.subTodo = todo.subTodo.filter((subTodo) => subTodo.id !== idChild);
      }

      return todo;
    });
    updateTodo(todoList);
  };

  const deleteTodo = () => {
    let todoList = todos.filter((todo) => todo.id !== todoId);
    updateTodo(todoList);
  };

  /* add sub todo */
  const addSubTodo = (data) => {
    todos.map((todo) => {
      if (todoId === todo.id) {
        todo.subTodo.push(data);
      }
    });
    updateTodo(todos);
  };

  /* edit todo */
  const editTodo = (data) => {
    todos.map((todo) => {
      if (todo.id === todo.id) {
        todo = data;
      }
    });
    updateTodo(todos);
    setTodo({});
  };

  /* check or uncheck all todo */
  const checkUncheckAll = (value, id) => {
    const todoList = todos.map((todo) => {
      if (todo.id === id) {
        todo.isDone = value;
        todo.subTodo.map((subTodo) => {
          subTodo.isDone = value;
        });
      }
      return todo;
    });
    updateTodo(todoList);
  };

  const isAllSelected = (value, idParent, idChild) => {
    const todoList = todos.map((todo) => {
      if (todo.id === idParent) {
        todo.isDone = todo.subTodo
          .map((subTodo) => {
            if (subTodo.id === idChild) {
              subTodo.isDone = value;
            }
            return subTodo;
          })
          .every((subtodo) => subtodo.isDone);
      }
      return todo;
    });
    updateTodo(todoList);
  };

  /* get data from modals and save */
  const saveData = (data) => {
    let body = {
      id: uuid(),
      dueDate: convertDateToTimezone(data.datetime),
      isDone: false,
      name: data.todo,
      userId: userLogin.id,
      subTodo: [],
    };
    if (modalActions === "addSubTodo") {
      addSubTodo(body);
    } else if (modalActions === "edit") {
      todo.name = data.todo;
      todo.dueDate = convertDateToTimezone(data.datetime);
      editTodo(todo);
    } else {
      updateTodo([...todos, body]);
    }

    setOpenModal(false);
  };

  const printDueDate = (date) => {
    if (new Date(date).getTime() < now.getTime()) {
      return `Overdue - ${date}`;
    } else if (new Date(date).getTime() > now.getTime()) {
      return date;
    } else {
      return "Today";
    }
  };

  const printDueDateClassname = (date) => {
    if (new Date(date).getTime() < now.getTime()) {
      return `text-[#e11d23]`;
    } else if (new Date(date).getTime() > now.getTime()) {
      return `text-[#154886]`;
    } else {
      return `text-[#107d38]`;
    }
  };

  useEffect(() => {
    !JSON.parse(localStorage.getItem("userLogin")) && navigate("/login");
  }, []);
  return (
    <div className="flex flex-col space-y-8">
      {/* title and button add */}
      <div className="flex space-x-8 items-center">
        <div className="flex space-x-2.5 items-center">
          <img src={ImgTodo} alt="" />
          <h2 className="text-2xl font-medium">Todo</h2>
        </div>
        <button
          className="p-3.5 border border-[#bdbdbd] rounded-lg flex space-x-2 items-center"
          onClick={() => onOpenModalAdd()}
        >
          <p className="w-[150px] text-left">Created Todo</p>
          <Add style={{ fontSize: 15 }} />
        </button>
      </div>

      {/* list */}
      {todos.filter((todo) => todo.userId === userLogin.id).length < 1 ? (
        <div className="flex flex-col items-center justify-center space-y-2.5 h-[calc(100vh-270px)]">
          <img src={ImgEmptyTodo} className="w-[273px] h-[273px]" alt="" />
          <p className="font-medium text-base text-[#154886]">
            You Don't Have a Todo Yet
          </p>
        </div>
      ) : (
        <div
          className={`grid ${
            todos.filter((todo) => todo.isDone && todo.userId === userLogin.id)
              .length >= 1
              ? "grid-cols-2"
              : ""
          } gap-10`}
        >
          {/* not checked */}
          <div className="flex flex-col space-y-6 px-8 py-6 rounded-2xl border border-[#cdd5e0]">
            <h3 className="text-[18px] font-medium">Not Checked</h3>
            <div className="flex flex-col space-y-3.5">
              {todos
                .filter((todo) => !todo.isDone && todo.userId === userLogin.id)
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                .map((todo, idx) => (
                  <div
                    className="flex flex-col space-y-[15px] rounded-2xl border border-[#cdd5e0] p-[15px]"
                    key={todo.id}
                  >
                    {/* parent */}
                    <div className="w-full flex justify-between">
                      <div className="flex items-center space-x-[15px]">
                        <Checkbox
                          checked={todo.isDone}
                          color="success"
                          onChange={(e) =>
                            checkUncheckAll(e.target.checked, todo.id)
                          }
                        />
                        <p className="text-base">{todo.name}</p>
                      </div>
                      <div className="flex space-x-3.5 items-center">
                        <p
                          className={printDueDateClassname(
                            convertDate(todo.dueDate)
                          )}
                        >
                          {/* {convertDate(todo.dueDate)} */}
                          {printDueDate(convertDate(todo.dueDate))}
                        </p>

                        {/* more menu */}
                        <div className="relative">
                          <button
                            onClick={() =>
                              onClickMenu(`menu-unchecked-${idx + 1}`, todo.id)
                            }
                          >
                            <MoreVert />
                          </button>

                          <MoreMenu
                            menuItem={["Edit", "Delete", "Create Sub Todo"]}
                            open={idMenu === `menu-unchecked-${idx + 1}`}
                            key={idx}
                            onClickMenuItem={(menuId) =>
                              onClickMenuItem(menuId, todo)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* sub todo */}
                    {todo.subTodo.length > 0 && (
                      <div className="flex flex-col space-y-3">
                        {todo.subTodo.map((sub) => (
                          <div
                            className="bg-white rounded-2xl p-[15px] shadow-sidebar w-full flex justify-between"
                            key={`sub-${todo.id}-${sub.id}`}
                          >
                            <div className="flex items-center space-x-[15px]">
                              <Checkbox
                                checked={sub.isDone}
                                color="success"
                                onChange={(e) =>
                                  isAllSelected(
                                    e.target.checked,
                                    todo.id,
                                    sub.id
                                  )
                                }
                              />
                              <p className="text-base">{sub.name}</p>
                            </div>
                            <button
                              onClick={() => deleteSubTodo(todo.id, sub.id)}
                            >
                              <DeleteOutline />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* checked */}
          {todos.filter((todo) => todo.isDone && todo.userId === userLogin.id)
            .length >= 1 && (
            <div className="flex flex-col space-y-6 px-8 py-6 rounded-2xl border border-[#cdd5e0]">
              <h3 className="text-[18px] font-medium">Checked</h3>
              <div className="flex flex-col space-y-3.5">
                {todos
                  .filter((todo) => todo.isDone && todo.userId === userLogin.id)
                  .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
                  .map((todo, idx) => (
                    <div
                      className="flex flex-col space-y-[15px] rounded-2xl border border-[#cdd5e0] p-[15px]"
                      key={todo.id}
                    >
                      {/* parent */}
                      <div className="w-full flex justify-between">
                        <div className="flex items-center space-x-[15px]">
                          <Checkbox
                            checked={todo.isDone}
                            onChange={(e) =>
                              checkUncheckAll(e.target.checked, todo.id)
                            }
                            color="success"
                          />
                          <p className="text-base line-through">{todo.name}</p>
                        </div>
                        <div className="flex space-x-3.5 items-center">
                          <p className="text-[#154886]">
                            {convertDate(todo.dueDate)}
                          </p>
                          {/* more menu */}
                          <div className="relative">
                            <button
                              onClick={() =>
                                onClickMenu(`menu-checked-${idx + 1}`, todo.id)
                              }
                            >
                              <MoreVert />
                            </button>

                            <MoreMenu
                              menuItem={["Edit", "Delete", "Create Sub Todo"]}
                              open={idMenu === `menu-checked-${idx + 1}`}
                              key={idx}
                              onClickMenuItem={(menuId) =>
                                onClickMenuItem(menuId, todo)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      {/* sub todo */}
                      {todo.subTodo.length > 0 && (
                        <div className="flex flex-col space-y-3.5">
                          {todo.subTodo.map((sub) => (
                            <div
                              className="bg-white rounded-2xl p-[15px] shadow-sidebar w-full flex justify-between"
                              key={`sub-${todo.id}-${sub.id}`}
                            >
                              <div className="flex items-center space-x-[15px]">
                                <Checkbox
                                  checked={sub.isDone}
                                  onChange={(e) =>
                                    isAllSelected(
                                      e.target.checked,
                                      todo.id,
                                      sub.id
                                    )
                                  }
                                  color="success"
                                />
                                <p className="text-base line-through">
                                  {sub.name}
                                </p>
                              </div>
                              <button>
                                <DeleteOutline />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* modal add */}
      <DialogUpdate
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={saveData}
        action={modalActions}
        data={todo}
      />
    </div>
  );
};

export default Home;
