// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    
    // Atualiza o ano no rodapé automaticamente
    const yearSpan = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;

    console.log("Portfólio carregado com sucesso!");
});