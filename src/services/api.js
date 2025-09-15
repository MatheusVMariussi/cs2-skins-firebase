// frontend/src/services/api.js
import { db } from '../firebase';

import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter, 
  getCountFromServer
} from "firebase/firestore";

const anunciosCollectionRef = collection(db, 'anuncios');

// Função para buscar anúncios com filtros e paginação
export const getAnuncios = async (page = 1, filters = {}) => {
  try {
    const itemsPerPage = 12;
    let q = query(anunciosCollectionRef, orderBy('data_anuncio', 'desc'));

    // Aplica filtros
    if (filters.arma) {
      q = query(q, where('arma', '==', filters.arma));
    }
    if (filters.raridade) {
      q = query(q, where('raridade', '==', filters.raridade));
    }
    if (filters.minPrice) {
      q = query(q, where('valor', '>=', parseFloat(filters.minPrice)));
    }
    if (filters.maxPrice) {
      q = query(q, where('valor', '<=', parseFloat(filters.maxPrice)));
    }

    // Paginação
    const countSnapshot = await getCountFromServer(q);
    const total = countSnapshot.data().count;
    const totalPages = Math.ceil(total / itemsPerPage);

    if (page > 1) {
        const first = query(q, limit((page - 1) * itemsPerPage));
        const documentSnapshots = await getDocs(first);
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        q = query(q, startAfter(lastVisible));
    }

    q = query(q, limit(itemsPerPage));

    const data = await getDocs(q);

    const anuncios = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    return { anuncios, totalPages };

  } catch (error) {
    console.error('Erro ao buscar anúncios:', error);
    throw error;
  }
};


// Funções de CRUD
export const getAnuncioById = async (id) => {
  const anuncioDoc = doc(db, 'anuncios', id);
  const docSnap = await getDoc(anuncioDoc);
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id };
  } else {
    throw new Error("Anúncio não encontrado");
  }
};

export const createAnuncio = async (anuncioData, userId) => {
  const dataComTimestamp = {
    ...anuncioData,
    data_anuncio: new Date(),
    userId: userId 
  };
  return await addDoc(anunciosCollectionRef, dataComTimestamp);
};

export const updateAnuncio = async (id, anuncioData) => {
  const anuncioDoc = doc(db, 'anuncios', id);
  return await updateDoc(anuncioDoc, anuncioData);
};

export const deleteAnuncio = async (id) => {
  const anuncioDoc = doc(db, 'anuncios', id);
  return await deleteDoc(anuncioDoc);
};