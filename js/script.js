if(document.getElementById("loginForm")){
    document.addEventListener("DOMContentLoaded", async () => {
        const loginForm = document.getElementById("loginForm");
        const errorMessage = document.getElementById("error-message");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const loadingContainer = document.getElementById("loadingContainer");
    
        // 🔹 Validación de localStorage para iniciar sesión automáticamente
        if (localStorage.getItem("savedEmail") && localStorage.getItem("savedPassword")) {
            emailInput.value = localStorage.getItem("savedEmail");
            passwordInput.value = localStorage.getItem("savedPassword");
    
            // 🔹 Ocultar los campos y mostrar el loader al intentar login automático
            loginForm.classList.add("hide-fields");
            loadingContainer.style.display = "flex";
    
            setTimeout(async () => {
                try {
                    const response = await fetch("index.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: new URLSearchParams({ 
                            email: emailInput.value, 
                            password: passwordInput.value, 
                            localStorageCheck: "true" 
                        })
                    });
    
                    const result = await response.json();
    
                    if (result.status === "success") {
                        window.location.href = result.redirect;
                    } else {
                        // 🔹 Restaurar los campos si el login automático falla
                        loginForm.classList.remove("hide-fields");
                        loadingContainer.style.display = "none";
                    }
                } catch (error) {
                    console.error("Error al intentar iniciar sesión automáticamente:", error);
    
                    // 🔹 Restaurar los campos y ocultar loader en caso de error
                    loginForm.classList.remove("hide-fields");
                    loadingContainer.style.display = "none";
                }
            }, 3000);
        }
    
        if (loginForm) {
            loginForm.addEventListener("submit", async (event) => {
                event.preventDefault();
    
                const email = emailInput.value.trim();
                const password = passwordInput.value.trim();
    
                if (!email || !password) {
                    errorMessage.innerHTML = "Por favor<br>completa todos los campos.";
                    errorMessage.style.color = "red";
                    return;
                }
    
                // 🔹 Ocultar los campos y mostrar el loader al hacer login manual
                loginForm.classList.add("hide-fields");
                errorMessage.classList.add("hide-fields")
                loadingContainer.style.display = "flex";
    
                setTimeout(async () => {
                    try {
                        const response = await fetch("index.php", {
                            method: "POST",
                            headers: { "Content-Type": "application/x-www-form-urlencoded" },
                            body: new URLSearchParams({ email, password })
                            
                        });
    
                        const result = await response.json();
    
                        if (result.status === "success") {
                            // Guardar credenciales en LocalStorage
                            localStorage.setItem("savedEmail", email);
                            localStorage.setItem("savedPassword", password);
    
                            window.location.href = result.redirect;
                            
                        } else {
                            errorMessage.textContent = result.message;
                            errorMessage.style.color = "red";
    
                            // 🔹 Restaurar los campos y ocultar loader si el login falla
                            loginForm.classList.remove("hide-fields");
                            errorMessage.classList.remove("hide-fields");
                            loadingContainer.style.display = "none";
                        }
                    } catch (error) {
                        console.error("Error en la solicitud:", error);
                        errorMessage.textContent = "Error en la conexión al servidor.";
                        errorMessage.style.color = "red";
    
                        // 🔹 Restaurar los campos y ocultar loader en caso de error
                        loginForm.classList.remove("hide-fields");
                        loadingContainer.style.display = "none";
                    }
                }, 3000);
            });
        }
    });
     
}
if(document.getElementById("logoutButton")){
     // Limpiar LocalStorage cuando el usuario cierre sesión
     const logoutButton = document.getElementById("logoutButton");
     if (logoutButton) {
         logoutButton.addEventListener("click", (event) => {
             event.preventDefault(); // Evita la acción predeterminada del enlace
             localStorage.removeItem("savedEmail");
             localStorage.removeItem("savedPassword");
             window.location.href = "logout.php"; // Redirigir tras borrar el LocalStorage
         });
     }
}