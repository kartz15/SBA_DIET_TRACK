document.addEventListener('DOMContentLoaded', function() {
    const mealForm = document.getElementById('meal-form');
    const mealTableBody = document.getElementById('meal-table-body');
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const closeModalButton = document.querySelector('#edit-modal .close');
    let currentEditId = null;

    // Profile and Settings elements
    const profilePic = document.getElementById('profile-pic');
    const usernameSpan = document.getElementById('username');
    const settingsButton = document.getElementById('settings-button');
    const settingsModal = document.getElementById('settings-modal');
    const settingsCloseButton = settingsModal.querySelector('.close');
    const settingsForm = document.getElementById('settings-form');
    const newUsernameInput = document.getElementById('new-username');
    const newProfilePicInput = document.getElementById('new-profile-pic');


    // Show or hide "Other Meal Type" based on selected meal type
    function toggleOtherMealVisibility() {
        const mealType = document.getElementById('meal-type').value;
        document.getElementById('other-meal-container').style.display = mealType === 'other' ? 'block' : 'none';
    }

    function toggleEditOtherMealVisibility() {
        const mealType = document.getElementById('edit-meal-type').value;
        document.getElementById('edit-other-meal-container').style.display = mealType === 'other' ? 'block' : 'none';
    }

    mealForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const date = document.getElementById('date').value;
        const mealType = document.getElementById('meal-type').value;
        const otherMealName = mealType === 'other' ? document.getElementById('meal-name-other').value : '';
        const mealName = document.getElementById('meal-name').value;
        const calories = document.getElementById('calories').value;
        const quantity = document.getElementById('quantity').value;

         // Get the date value from the form
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set today's date to start of day

        // Check if the selected date is in the future
        if (selectedDate > today) {
            alert('The date cannot be in the future.');
            return;
        }

        if (!date || !mealType || !mealName || !calories || !quantity) {
            alert('Please fill all required fields.');
            return;
        }

        const row = document.createElement('tr');
        const id = Date.now(); // Unique ID for each row
        row.innerHTML = `
            <td>${date}</td>
            <td>${mealType === 'other' ? otherMealName : mealType}</td>
            <td>${mealName}</td>
            <td>${calories}</td>
            <td>${quantity}</td>
            <td>
                <button class="edit-btn" data-id="${id}">Edit</button>
                <button class="delete-btn" data-id="${id}">Delete</button>
            </td>
        `;
        mealTableBody.appendChild(row);

        mealForm.reset();
        document.getElementById('other-meal-container').style.display = 'none';
    });

    mealTableBody.addEventListener('click', function(event) {
        if (event.target.closest('.edit-btn')) {
            const row = event.target.closest('tr');
            const date = row.children[0].textContent;
            const mealType = row.children[1].textContent;
            const mealName = row.children[2].textContent;
            const calories = row.children[3].textContent;
            const quantity = row.children[4].textContent;

            currentEditId = event.target.closest('.edit-btn').dataset.id;

            document.getElementById('edit-date').value = date;
            document.getElementById('edit-calories').value = calories;
            document.getElementById('edit-quantity').value = quantity;

            // if (mealType === 'other') {
            //     document.getElementById('edit-meal-type').value = 'other';
            //     document.getElementById('edit-other-meal-container').style.display = 'block';
            //     document.getElementById('edit-meal-name-other').value = mealType;
            // } else {
            //     console.log(mealType);
            //     document.getElementById('edit-meal-type').value = mealType.toLowerCase();
            //     document.getElementById('edit-other-meal-container').style.display = 'none';
            //     document.getElementById('edit-meal-name-other').value = '';
            // }

            if (mealType === 'breakfast' || mealType === 'lunch' || mealType === 'dinner') {
                document.getElementById('edit-meal-type').value = mealType.toLowerCase();
                document.getElementById('edit-meal-name-other').value = '';
                document.getElementById('edit-other-meal-container').classList.add('hidden');
            } else {
                document.getElementById('edit-meal-type').value = 'other';
                document.getElementById('edit-meal-name-other').value = mealType;
                document.getElementById('edit-other-meal-container').classList.remove('hidden');
            }


            document.getElementById('edit-meal-name').value = mealName;
            editModal.style.display = 'block';
        }

        if (event.target.closest('.delete-btn')) {
            const row = event.target.closest('tr');
            if (confirm('Are you sure you want to delete this meal?')) {
                row.remove();
            }
        }
        
    });
    
        // Open settings modal
        settingsButton.addEventListener('click', () => {
            settingsModal.style.display = 'block';
            newUsernameInput.value = usernameSpan.textContent;
        });

        
            // Close settings modal
    settingsCloseButton.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

        // Handle settings form submission
        settingsForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent page reload
    
            // Update username
            const newUsername = newUsernameInput.value;
            usernameSpan.textContent = newUsername;
    
            // Update profile picture
            const file = newProfilePicInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profilePic.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
    
            // Close modal after saving
            settingsModal.style.display = 'none';
        });
        

            // Close modal if clicked outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });


    closeModalButton.addEventListener('click', function() {
        editModal.style.display = 'none';
    });

    editForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const date = document.getElementById('edit-date').value;
        const mealType = document.getElementById('edit-meal-type').value;
        const otherMealName = mealType === 'other' ? document.getElementById('edit-meal-name-other').value : '';
        const mealName = document.getElementById('edit-meal-name').value;
        const calories = document.getElementById('edit-calories').value;
        const quantity = document.getElementById('edit-quantity').value;

        // Get the date value from the form
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set today's date to start of day

        // Check if the selected date is in the future
        if (selectedDate > today) {
            alert('The date cannot be in the future.');
            return;
        }


        if (!date || !mealType || !mealName || !calories || !quantity) {
            alert('Please fill all required fields.');
            return;
        }

        const row = Array.from(mealTableBody.querySelectorAll('tr')).find(r => r.querySelector('.edit-btn').dataset.id === currentEditId);

        row.children[0].textContent = date;
        row.children[1].textContent = mealType === 'other' ? otherMealName : mealType;
        row.children[2].textContent = mealName;
        row.children[3].textContent = calories;
        row.children[4].textContent = quantity;

        editModal.style.display = 'none';
    });

    document.getElementById('meal-type').addEventListener('change', toggleOtherMealVisibility);
    document.getElementById('edit-meal-type').addEventListener('change', toggleEditOtherMealVisibility);



    
});
