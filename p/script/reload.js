 // Checa se a página foi recarregada (reload)
  if (performance.getEntriesByType("navigation")[0].type === "reload") {
    window.location.replace('index.html');
  }