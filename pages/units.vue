<template>
  <div class="flex items-center justify-center">
    <UiList class="">
      <template v-for="unit in unitList" :key="unit.unit_id">
        <UiListItem class="py-5 items-start px-0" :to="`/list-item/${n}`">
          <UiListContent>
            <UiListTitle :title="unit.name" />
            <UiListSubtitle
              class="line-clamp-2"
              :subtitle="unit.grade_name"
            />
          </UiListContent>
          <UiButton
            size="icon-sm"
            variant="ghost"
            class="ml-auto shrink-0 self-center rounded-full"
          >
            <Icon name="lucide:chevron-right" />
          </UiButton>
        </UiListItem>
        <UiSeparator class="ml-auto last:hidden" />
      </template>
    </UiList>
  </div>
</template>

<script lang="js" setup>

import { useUnitStore } from "@/stores/unitStore";

const unitStore = useUnitStore();

const { unitList } = storeToRefs(unitStore);

// import { useAuthStore } from "@/stores/authStore";

// const authStore = useAuthStore();
// // Breadcrumb items
// const breadcrumbItems = [
//   { label: "Building Your Application", link: "#" },
//   { label: "Data Fetching", link: "#" },
// ];
// // This is sample data.
// const data = {
//   user: {
//     name: "breezy",
//     email: "m@example.com",
//     avatar: "https://behonbaker.com/icon.png",
//   },
//   teams: [
//     {
//       name: "Acme Inc",
//       logo: "lucide:gallery-vertical-end",
//       plan: "Enterprise",
//     },
//     {
//       name: "Acme Corp.",
//       logo: "lucide:audio-waveform",
//       plan: "Startup",
//     },
//     {
//       name: "Evil Corp.",
//       logo: "lucide:command",
//       plan: "Free",
//     },
//   ],
//   navMain: [
//     {
//       title: "Playground",
//       url: "#",
//       icon: "lucide:square-terminal",
//       isActive: true,
//       items: [
//         {
//           title: "History",
//           url: "#",
//         },
//         {
//           title: "Starred",
//           url: "#",
//         },
//         {
//           title: "Settings",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Models",
//       url: "#",
//       icon: "lucide:bot",
//       items: [
//         {
//           title: "Genesis",
//           url: "#",
//         },
//         {
//           title: "Explorer",
//           url: "#",
//         },
//         {
//           title: "Quantum",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Documentation",
//       url: "#",
//       icon: "lucide:book-open",
//       items: [
//         {
//           title: "Introduction",
//           url: "#",
//         },
//         {
//           title: "Get Started",
//           url: "#",
//         },
//         {
//           title: "Tutorials",
//           url: "#",
//         },
//         {
//           title: "Changelog",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: "lucide:settings-2",
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: "lucide:frame",
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: "lucide:pie-chart",
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: "lucide:map",
//     },
//   ],
//   navSecondary: [
//     {
//       title: "Support",
//       url: "#",
//       icon: "lucide:life-buoy",
//     },
//     {
//       title: "Feedback",
//       url: "#",
//       icon: "lucide:send",
//     },
//   ],
// };
// const activeTeam = ref(data.teams[1]);

// const handleLogout = async () => {
//   const result = await authStore.logoutUser();
//   if (result) {
//     navigateTo("/auth/login");
//   }
// }
</script>