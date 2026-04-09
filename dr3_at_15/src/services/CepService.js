export const buscaEnderecoPorCep = async (cep) => {
  const cepLimpo = cep.replace(/\D/g, '');
  if (cepLimpo.length !== 8) return null;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    const data = await response.json();
    
    if (data.erro) return null;
    
    return `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return null;
  }
};