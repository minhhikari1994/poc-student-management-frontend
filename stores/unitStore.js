import { defineStore } from 'pinia'

export const useUnitStore = defineStore('unit', () => {
  const unitList = ref([
    {
      "grade_id": 1,
      "grade_name": "Vào Đời 1",
      "id": 1,
      "name": "Vào Đời 1A",
      "unit_id": "NKGL2024-VD1-A"
    },
    {
      "grade_id": 1,
      "grade_name": "Vào Đời 1",
      "id": 2,
      "name": "Vào Đời 1B",
      "unit_id": "NKGL2024-VD1-B"
    },
    {
      "grade_id": 1,
      "grade_name": "Vào Đời 1",
      "id": 3,
      "name": "Vào Đời 1C",
      "unit_id": "NKGL2024-VD1-C"
    },
    {
      "grade_id": 1,
      "grade_name": "Vào Đời 1",
      "id": 4,
      "name": "Vào Đời 1D",
      "unit_id": "NKGL2024-VD1-D"
    },
    {
      "grade_id": 2,
      "grade_name": "Vào Đời 2",
      "id": 5,
      "name": "Vào Đời 2A",
      "unit_id": "NKG2024-VD2-A"
    },
    {
      "grade_id": 3,
      "grade_name": "Vào Đời 3",
      "id": 6,
      "name": "Vào Đời 3A",
      "unit_id": "NKG2024-VD3-A"
    },
    {
      "grade_id": 1,
      "grade_name": "Vào Đời 1",
      "id": 1,
      "name": "Vào Đời 1A",
      "unit_id": "NKGL2024-VD1-A"
    },
    {
      "grade_id": 1,
      "grade_name": "Vào Đời 1",
      "id": 2,
      "name": "Vào Đời 1B",
      "unit_id": "NKGL2024-VD1-B"
    },
    {
      "grade_id": 1,
      "grade_name": "Vào Đời 1",
      "id": 3,
      "name": "Vào Đời 1C",
      "unit_id": "NKGL2024-VD1-C"
    },
    {
      "grade_id": 1,
      "grade_name": "Vào Đời 1",
      "id": 4,
      "name": "Vào Đời 1D",
      "unit_id": "NKGL2024-VD1-D"
    },
    {
      "grade_id": 2,
      "grade_name": "Vào Đời 2",
      "id": 5,
      "name": "Vào Đời 2A",
      "unit_id": "NKG2024-VD2-A"
    },
    {
      "grade_id": 3,
      "grade_name": "Vào Đời 3",
      "id": 6,
      "name": "Vào Đời 3A",
      "unit_id": "NKG2024-VD3-A"
    },
    {
      "grade_id": 1,
      "grade_name": "Vào Đời 1",
      "id": 1,
      "name": "Vào Đời 1A",
      "unit_id": "NKGL2024-VD1-A"
    },
    {
      "grade_id": 1,
      "grade_name": "Vào Đời 1",
      "id": 2,
      "name": "Vào Đời 1B",
      "unit_id": "NKGL2024-VD1-B"
    },
    {
      "grade_id": 1,
      "grade_name": "Vào Đời 1",
      "id": 3,
      "name": "Vào Đời 1C",
      "unit_id": "NKGL2024-VD1-C"
    },
    {
      "grade_id": 1,
      "grade_name": "Vào Đời 1",
      "id": 4,
      "name": "Vào Đời 1D",
      "unit_id": "NKGL2024-VD1-D"
    },
    {
      "grade_id": 2,
      "grade_name": "Vào Đời 2",
      "id": 5,
      "name": "Vào Đời 2A",
      "unit_id": "NKG2024-VD2-A"
    },
    {
      "grade_id": 3,
      "grade_name": "Vào Đời 3",
      "id": 6,
      "name": "Vào Đời 3A",
      "unit_id": "NKG2024-VD3-A"
    },
    {
      "grade_id": 1,
      "grade_name": "Vào Đời 1",
      "id": 1,
      "name": "Vào Đời 1A",
      "unit_id": "NKGL2024-VD1-A"
    },
    {
      "grade_id": 1,
      "grade_name": "Vào Đời 1",
      "id": 2,
      "name": "Vào Đời 1B",
      "unit_id": "NKGL2024-VD1-B"
    },
    {
      "grade_id": 1,
      "grade_name": "Vào Đời 1",
      "id": 3,
      "name": "Vào Đời 1C",
      "unit_id": "NKGL2024-VD1-C"
    },
    {
      "grade_id": 1,
      "grade_name": "Vào Đời 1",
      "id": 4,
      "name": "Vào Đời 1D",
      "unit_id": "NKGL2024-VD1-D"
    },
    {
      "grade_id": 2,
      "grade_name": "Vào Đời 2",
      "id": 5,
      "name": "Vào Đời 2A",
      "unit_id": "NKG2024-VD2-A"
    },
    {
      "grade_id": 3,
      "grade_name": "Vào Đời 3",
      "id": 6,
      "name": "Vào Đời 3A",
      "unit_id": "NKG2024-VD3-A"
    }
  ])

  return { unitList }
})
