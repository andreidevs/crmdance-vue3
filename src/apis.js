

import { ElMessage } from "element-plus";
import { supabase } from "@/supabase";
import { getPagination } from "./utils";


export const addData = async ({ tableName = null, data: addData = null, messageSuccess = "Успешно добавлено", }) => {
  try {
    if (!tableName) {
      ElMessage.error("Добавьте название коллекции (collectionName)!");
      return
    }
    if (!addData) {
      ElMessage.error("Поле data не может быть пустым!");
      return
    }

    const { data, error } = await supabase
      .from(tableName)
      .insert(addData, { upsert: true })

    if (error) throw error

    ElMessage.success(messageSuccess);
    return data
  }
  catch (error) {
    ElMessage.error(`ОШИБКА!! ${error.message}`);
  }

}


export const getById = async ({ tableName = null, id = null }) => {
  try {
    if (!tableName) {
      ElMessage.error("Добавьте название коллекции (tableName)!");
      return
    }

    if (!id) {
      ElMessage.error("ID не может быть пустым!");
      return
    }
    const { from, to } = getPagination(page, 10);
    const { data, error } = await supabase
      .from(tableName)
      .select('*, coach(*), type(*) ')

      .range(from, to);

    console.log("getById", data)

    if (error) throw error
    return data

  }
  catch (error) {
    ElMessage.error(`ОШИБКА!! ${error.message}`);
  }
}
export const getTable = async ({ tableName = null, select = "*", pagination = false, page = 1, size = 10 }) => {
  try {
    if (!tableName) {
      ElMessage.error("Добавьте название коллекции (tableName)!");
      return
    }
    if (page === 0) {
      ElMessage.error("Page не может быть 0!");
      return
    }

    if (pagination) {

      const { from, to } = getPagination(page - 1, size);

      const { data, error, count } = await supabase.from(tableName)
        .select(select, { count: "exact" })
        .order("id", { ascending: true })
        .range(from, to);

      const pages = (count + size - 1) / size;
      const next = pages !== page
      const prev = page !== 1
      if (error) throw error

      return { data, count, next, prev }

    } else {
      const { data, error, count } = await supabase.from(tableName)
        .select(select, { count: "exact" })
        .order("id", { ascending: true })
      if (error) throw error
      return { data, count }
    }
  }
  catch (error) {
    ElMessage.error(`ОШИБКА!! ${error.message}`);
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


