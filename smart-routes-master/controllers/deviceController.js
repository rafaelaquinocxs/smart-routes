const Device = require('../models/Device');

// Função para criar um novo dispositivo
exports.createDevice = async (req, res) => {
  try {
    // Extraindo as informações do corpo da requisição
    const { name, type, status } = req.body;

    // Verificando se os dados obrigatórios foram fornecidos
    if (!name || !type || !status) {
      return res.status(400).json({ error: 'Nome, tipo e status são obrigatórios.' });
    }

    // Criando o dispositivo, associando o usuário
    const device = await Device.create({
      name,
      type,
      status,
      userId: req.user.id // Usando o ID do usuário autenticado
    });

    // Retornando o dispositivo criado com status 201
    res.status(201).json(device);
  } catch (error) {
    // Tratando erros gerais com status 500
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar dispositivo. Tente novamente.' });
  }
};

// Função para obter um dispositivo pelo ID
exports.getDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const device = await Device.findById(id);

    // Se o dispositivo não for encontrado
    if (!device) {
      return res.status(404).json({ error: 'Dispositivo não encontrado.' });
    }

    res.status(200).json(device);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dispositivo.' });
  }
};

// Função para atualizar um dispositivo
exports.updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, status } = req.body;

    // Verificando se o dispositivo existe
    const device = await Device.findById(id);
    if (!device) {
      return res.status(404).json({ error: 'Dispositivo não encontrado.' });
    }

    // Atualizando o dispositivo
    device.name = name || device.name;
    device.type = type || device.type;
    device.status = status || device.status;

    // Salvando as alterações
    await device.save();

    res.status(200).json(device);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar dispositivo.' });
  }
};

// Função para excluir um dispositivo
exports.deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificando se o dispositivo existe
    const device = await Device.findById(id);
    if (!device) {
      return res.status(404).json({ error: 'Dispositivo não encontrado.' });
    }

    // Excluindo o dispositivo
    await device.remove();

    res.status(200).json({ message: 'Dispositivo excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir dispositivo.' });
  }
};
