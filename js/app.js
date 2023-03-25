listDom = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const listDom = document.getElementById('list');
    listDom.innerHTML = "";
    tasks.forEach(element => {
        let newInput = document.createElement('li');

        newInput.classList.add("list-group-item");
        newInput.addEventListener("click", () => todoChecked(element));
        if (element.checked)
            newInput.classList.add("checked");

        newInput.innerHTML = element.task;
        listDom.appendChild(newInput);
    });
}
listDom();

myAlert = (title, message) => {
    // let alert = document.getElementById('alert');
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function (toastEl) {
        // Creates an array of toasts (it only initializes them)
        return new bootstrap.Toast(toastEl) // No need for options; use the default options
    });

    document.querySelector('#toastTitle').innerHTML = title;
    document.querySelector('#toastBody').innerHTML = message;


    toastList.forEach(toast => toast.show()); // This show them
}

newElement = () => {
    textInput = document.getElementById('task');
    if (textInput.value == "" || textInput.value == null) {
        myAlert('Error', 'Input is empty!');
    }
    else {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let isUnique = true;
        tasks.filter(element => {
            if (element.task == textInput.value) {
                textInput.value = "";
                isUnique = false;
                myAlert('Error', 'This todo is already exist!');
            }
        });

        if (isUnique) {
            tasks.push({ 'task': textInput.value, 'checked': false });
            textInput.value = "";
            localStorage.setItem("tasks", JSON.stringify(tasks));

            myAlert('Success', 'Todo successfully added!');
            listDom();
        }
    }
}


todoChecked = (e) => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.filter((element, index) => {
        if (element.task == e.task) {
            if (!element.checked) {
                element.checked = !element.checked;
            } else {
                if (confirm('Are you sure you want to delete this todo?')) {
                    // Save it!
                    tasks.splice(index, 1);
                } else {
                    // Do nothing!
                    element.checked = !element.checked;
                }
            }
        }
    });

    localStorage.clear('tasks');
    localStorage.setItem("tasks", JSON.stringify(tasks));

    !e.checked ? myAlert('Success', 'Todo is done!') : myAlert('Success', 'Todo is undone!');

    listDom();
}
