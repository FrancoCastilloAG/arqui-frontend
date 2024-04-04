"use client"
import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { useUser } from '../../app/userContext';

interface Movement {
  id: string;
  category: string;
  description: string;
  value: number;
  createdAt: string;
}

const MovementPage: React.FC = () => {
  const { user } = useUser();
  const [movements, setMovements] = useState<Movement[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newMovementData, setNewMovementData] = useState<Partial<Movement>>({
    category: '',
    description: '',
    value: 0,
  });

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3001/movements/${user.rut}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: Movement[]) => {
          setMovements(data);
        })
        .catch(error => {
          console.error('Error fetching movements:', error);
        });
    }
  }, [user]);

  const handleAddMovement = () => {
    const { category, description, value } = newMovementData;
    
    fetch(`http://localhost:3001/movements/${user?.rut}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category, description, value }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Solicitud POST enviada:', JSON.stringify({ category, description, value }));
      return response.json();
    })
    .then((data: Movement) => {
      setMovements([...movements, data]);
    })
    .catch(error => {
      console.error('Error adding movement:', error);
    });
  
    setModalOpen(false);
  };
  
  const handleDeleteMovement = (id: string) => {
    fetch(`http://localhost:3001/movements/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setMovements(movements.filter(movement => movement.id !== id));
    })
    .catch(error => {
      console.error('Error deleting movement:', error);
    });
  };

  return (
    <div>
      <h1>Movimientos del Usuario</h1>
      <Button onClick={() => setModalOpen(true)}>Agregar Movimiento</Button>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="modal-content">
          <Input label="Categoría" value={newMovementData.category || ''} onChange={(e) => setNewMovementData({...newMovementData, category: e.target.value})} />
          <Input label="Descripción" value={newMovementData.description || ''} onChange={(e) => setNewMovementData({...newMovementData, description: e.target.value})} />
          <Input 
  label="Valor" 
  type="number" 
  value={newMovementData.value !== undefined ? String(newMovementData.value) : ''} 
  onChange={(e) => setNewMovementData({...newMovementData, value: parseFloat(e.target.value)})} 
/>

          <Button onClick={handleAddMovement}>Agregar</Button>
          <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
        </div>
      </Modal>

      <Table aria-label="Movimientos del Usuario">
        <TableHeader>
          <TableColumn>Categoría</TableColumn>
          <TableColumn>Descripción</TableColumn>
          <TableColumn>Valor</TableColumn>
          <TableColumn>Fecha de Creación</TableColumn>
          <TableColumn>Acción</TableColumn>
        </TableHeader>
        <TableBody>
          {movements.map(movement => (
            <TableRow key={movement.id}>
              <TableCell>{movement.category}</TableCell>
              <TableCell>{movement.description}</TableCell>
              <TableCell>{movement.value}</TableCell>
              <TableCell>{movement.createdAt}</TableCell>
              <TableCell>
                <Button onClick={() => handleDeleteMovement(movement.id)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MovementPage;
