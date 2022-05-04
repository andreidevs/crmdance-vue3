

import { ElMessage } from "element-plus";
import { supabase } from "@/supabase";
import { getPagination } from "./utils";
import { useFiltersStore } from './stores/filters';

export const addData = async ({ tableName = null, data: addData = null, manyTo = null, messageSuccess = "Успешно добавлено", }) => {
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

    if (manyTo) {
      const { error } = await supabase
        .from(manyTo.tableName)
        .insert(manyTo.data)

      if (error) throw error
    }

    if (error) throw error

    ElMessage.success(messageSuccess);
    return data
  }
  catch (error) {
    ElMessage.error(`ОШИБКА!! ${error.message}`);
  }

}


export const getById = async ({ tableName = null, id = null, select = "*", }) => {
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
      .select(select)
      .eq('id', id)


    // console.log("getById", data)

    if (error) throw error
    return data[0]

  }
  catch (error) {
    ElMessage.error(`ОШИБКА!! ${error.message}`);
  }
}

export const getTable = async ({ tableName = null, select = "*", key = null, pagination = false, page = 1, size = 10 }) => {
  try {
    if (!tableName) {
      ElMessage.error("Добавьте название коллекции (tableName)!");
      return
    }
    if (page === 0) {
      ElMessage.error("Page не может быть 0!");
      return
    }

    let query = await supabase
      .from(tableName)
      .select(select, { count: "exact" })
      .order("id", { ascending: true })




    if (pagination) {

      const { from, to } = getPagination(page - 1, size);

      query.range = from, to;

      const { data, error, count } = await query
      // .filter('groupTypes', 'in', 2)
      // .filter('room', 'in', "1")



      const pages = Math.floor((count + size - 1) / size);

      const next = pages > page
      const prev = page !== 1
      if (error) throw error

      return { data, count, next, prev }

    } else {
      const { data, error, count } = await query
      if (error) throw error
      return { data, count }
    }
  }
  catch (error) {
    ElMessage.error(`ОШИБКА!! ${error.message}`);
  }
}

export const getTableTest = async ({ tableName = null, select = "*", key = null, pagination = false, page = 1, size = 10 }) => {
  try {
    if (!tableName) {
      ElMessage.error("Добавьте название коллекции (tableName)!");
      return
    }
    if (page === 0) {
      ElMessage.error("Page не может быть 0!");
      return
    }

    // let query = await supabase
    //   .from(tableName)
    //   .select(select, { count: "exact" })
    //   .in('type', 1)
    // .filter('type', 'in', 1)

    // .order("id", { ascending: true })
    // .or('id.in.(1,2,3), i')





    const { from, to } = getPagination(page - 1, size);



    const { data, error, count } = await supabase
      .from(tableName)
      .select(select, { count: "exact" })
    // .in('type', 1, { inner: true })
    // .range(from, to)
    // .filter('room.id', 'in', 1,)
    // .filter('groupTypes', 'in', 2)
    // .filter('room', 'in', "1")



    const pages = Math.floor((count + size - 1) / size);

    const next = pages > page
    const prev = page !== 1
    if (error) throw error

    return { data, count, next, prev }


  }
  catch (error) {
    console.error(error)
    ElMessage.error(`ОШИБКА!! ${error.message}`);
  }

}




const getFilters = (key, query) => {
  const filterStore = useFiltersStore()
  if (key) {
    filterStore.filters.forEach(el => {
      if (el.type === "Select") {
        query
      }
    });
  } else return query

}

