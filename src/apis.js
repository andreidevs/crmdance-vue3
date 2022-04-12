

import { ElMessage } from "element-plus";
import { supabase } from "@/supabase";


export const setDoc = async (tableName = null, data = null, id = null, messageSuccess = "Успешно добавлено",) => {
  try {
    if (!collectionName) {
      ElMessage.error("Добавьте название коллекции (collectionName)!");
      return
    }
    if (!data) {
      ElMessage.error("Поле data не может быть пустым!");
      return
    }

    const { data, error } = await supabase
      .from(tableName)
      .select()


    ElMessage.success(messageSuccess);
    return docRef
  } catch (error) {
    console.error(error);
    ElMessage.error("Ошибка добавления!");
  }
}

// export const updateDoc = async (collectionName = null, data = null, id = null, messageSuccess = "Успешно обновленно",) => {
//   try {
//     if (!collectionName) {
//       ElMessage.error("Добавьте название коллекции (collectionName)!");
//       return
//     }
//     if (!data) {
//       ElMessage.error("Поле data не может быть пустым!");
//       return
//     }
//     if (!id) {
//       ElMessage.error("ID не может быть пустым!");
//       return
//     }

//     const docRef = doc(db, collectionName, id)

//     const newDoc = await updateDoc(docRef, data)

//     ElMessage.success(messageSuccess);
//     return newDoc
//   } catch (error) {
//     console.error(`Коллекция: ${collectionName}, Документ: ${id} Ошибка обновления! \n`, error);
//     ElMessage.error(`Коллекция: ${collectionName}, Документ: ${id} Ошибка обновления!`);
//   }
// }

// export const deleteDoc = async (collectionName = null, data = null, id = null, messageSuccess = "Успешно удалено",) => {
//   try {
//     if (!collectionName) {
//       ElMessage.error("Добавьте название коллекции (collectionName)!");
//       return
//     }

//     if (!id) {
//       ElMessage.error("ID не может быть пустым!");
//       return
//     }
//     await deleteDoc(doc(db, collectionName, id));

//     ElMessage.success(messageSuccess);
//     return
//   } catch (error) {
//     console.error(error);
//     ElMessage.error("Ошибка удаления!");
//   }
// }
export const getById = async (tableName = null, id = null,) => {
  try {
    if (!tableName) {
      ElMessage.error("Добавьте название коллекции (tableName)!");
      return
    }

    if (!id) {
      ElMessage.error("ID не может быть пустым!");
      return
    }

    const { data, error } = await supabase
      .from(tableName)
      .select('*, coach(*), type(*) ')



    console.log("getById", data)


    return data
  } catch (error) {
    console.error(error);
    ElMessage.error("Ошибка получения");
  }
}

// export const getDocs = async (collectionName = null, where = null) => {
//   try {
//     if (!collectionName) {
//       ElMessage.error("Добавьте название коллекции (collectionName)!");
//       return
//     }
//     if (where && where.length < 3) {
//       ElMessage.error("WHERE должен быть массивом из 3 элементов!");
//       return
//     }

//     const dbRef = collection(db, collectionName)
//     let q = dbRef

//     if (where)
//       q = query(dbRef, where(where[0], where[1], where[2]));

//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       return doc.data()
//     });


//   } catch (error) {
//     console.error(error, `Коллекция: ${collectionName}, Where: ${where}`);
//     ElMessage.error("Ошибка получения");
//   }
// }

// export const getDocsPaginate =
//   async (collectionName = null, pageSize = 20, prev = null, next = null, order = 'created', where = null,) => {
//     try {

//       if (!collectionName) {
//         ElMessage.error("Добавьте название коллекции (collectionName)!");
//         return
//       }
//       if (!order) {
//         ElMessage.error("Сортируемое поля обязательно (order)!");
//         return
//       }
//       if (where && where.length < 3) {
//         ElMessage.error("WHERE должен быть массивом из 3 элементов!");
//         return
//       }

//       const ref = collection(db, collectionName);

//       let q

//       if (!next && !prev)
//         q = query(ref, orderBy(order), limit(pageSize));

//       if (next) q = query(ref, orderBy(order), startAfter(next[order]), limit(pageSize))

//       if (prev) q = query(ref, orderBy(order), endBefore(prev[order]), limit(pageSize))




//       const documentSnapshots = await getDocs(q);

//       let res = []

//       documentSnapshots.forEach(async (doc) => {

//         res.push(doc.data())
//       });

//       return res



//     } catch (error) {
//       console.error(error, `Коллекция: ${collectionName}, Where: ${where}`);
//       ElMessage.error("Ошибка получения");
//     }
//   }


