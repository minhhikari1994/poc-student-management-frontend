<template>
  <UiSidebarProvider v-slot="{ isMobile, setOpenMobile, setOpen }">
    <!-- App Sidebar -->
    <UiSidebar variant="inset">
      <!-- Team switcher -->
      <UiSidebarHeader>
        <!-- <UiSidebarMenu>
          <UiSidebarMenuItem>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiSidebarMenuButton size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <div
                    class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Icon mode="svg" :name="activeTeam.logo" class="size-4" />
                  </div>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">
                      {{ activeTeam.name }}
                    </span>
                    <span class="truncate text-xs">{{ activeTeam.plan }}</span>
                  </div>
                  <Icon mode="svg" name="lucide:chevrons-up-down" class="ml-auto" />
                </UiSidebarMenuButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start"
                :side="isMobile ? 'bottom' : 'right'" :side-offset="4">
                <UiDropdownMenuLabel class="text-xs text-muted-foreground">
                  Teams
                </UiDropdownMenuLabel>
                <template v-for="(team, index) in data.teams" :key="index">
                  <UiDropdownMenuItem class="cursor-pointer gap-2 p-2"
                    :class="[team.name == activeTeam.name && 'bg-muted']" @click="activeTeam = team">
                    <div class="flex size-6 items-center justify-center rounded-sm border">
                      <Icon mode="svg" :name="team.logo" class="size-4 shrink-0" />
                    </div>
                    {{ team.name }}
                    <UiDropdownMenuShortcut>⌘{{ index + 1 }}</UiDropdownMenuShortcut>
                  </UiDropdownMenuItem>
                </template>
<UiDropdownMenuSeparator />
<UiDropdownMenuItem class="gap-2 p-2">
  <div class="flex size-6 items-center justify-center rounded-md border bg-background">
    <Icon name="lucide:plus" class="size-4" />
  </div>
  <div class="font-medium text-muted-foreground">Add team</div>
</UiDropdownMenuItem>
</UiDropdownMenuContent>
</UiDropdownMenu>
</UiSidebarMenuItem>
</UiSidebarMenu> -->

        <!-- Search form -->
        <!-- <form v-if="state != 'collapsed'">
          <UiSidebarGroup class="py-0">
            <UiSidebarGroupContent class="relative">
              <UiLabel for="search" class="sr-only"> Search </UiLabel>
              <UiSidebarInput id="search" placeholder="Search the docs..." class="pl-8" />
              <Icon name="lucide:search"
                class="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            </UiSidebarGroupContent>
          </UiSidebarGroup>
        </form> -->
      </UiSidebarHeader>
      <UiSidebarContent>
        <!-- Main -->
        <!-- <UiSidebarGroup>
          <UiSidebarGroupLabel label="Platform" />
          <UiSidebarMenu>
            <UiCollapsible v-for="(item, index) in data.navMain" :key="index" v-slot="{ open }" as-child
              :default-open="item.isActive">
              <UiSidebarMenuItem>
                <UiCollapsibleTrigger as-child>
                  <UiSidebarMenuButton :tooltip="item.title">
                    <Icon mode="svg" :name="item.icon" />

                    <span>{{ item.title }}</span>
                    <Icon mode="svg" name="lucide:chevron-right" class="ml-auto transition-transform duration-200"
                      :class="[open && 'rotate-90']" />
                  </UiSidebarMenuButton>
                </UiCollapsibleTrigger>
                <UiCollapsibleContent>
                  <UiSidebarMenuSub>
                    <UiSidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                      <UiSidebarMenuSubButton as-child>
                        <NuxtLink :href="subItem.url">
                          <span>{{ subItem.title }}</span>
                        </NuxtLink>
                      </UiSidebarMenuSubButton>
                    </UiSidebarMenuSubItem>
                  </UiSidebarMenuSub>
                </UiCollapsibleContent>
              </UiSidebarMenuItem>
            </UiCollapsible>
          </UiSidebarMenu>
        </UiSidebarGroup> -->
        <!-- My main -->
        <UiSidebarGroup>
          <!-- <UiSidebarGroupLabel label="Lớp" /> -->
          <UiSidebarMenu>
            <UiSidebarMenuItem v-for="(item, index) in data.navMain" :key="index">
              <NuxtLink @click.prevent="handleNavigate(item.url, isMobile, setOpenMobile)">
                <UiSidebarMenuButton :tooltip="item.title">
                  <Icon mode="svg" :name="item.icon" />
                  <span>{{ item.title }}</span>
                </UiSidebarMenuButton>
              </NuxtLink>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarGroup>
        <!-- Projects -->
        <!-- <UiSidebarGroup class="group-data-[collapsible=icon]:hidden">
          <UiSidebarGroupLabel label="Projects" />
          <UiSidebarMenu>
            <UiSidebarMenuItem v-for="item in data.projects" :key="item.name">
              <UiSidebarMenuButton as-child>
                <NuxtLink :href="item.url">
                  <Icon mode="svg" :name="item.icon" />
                  <span>{{ item.name }}</span>
                </NuxtLink>
              </UiSidebarMenuButton>
              <UiDropdownMenu>
                <UiDropdownMenuTrigger as-child>
                  <UiSidebarMenuAction show-on-hover>
                    <Icon mode="svg" name="lucide:ellipsis-vertical" class="rotate-90" />
                    <span class="sr-only">More</span>
                  </UiSidebarMenuAction>
                </UiDropdownMenuTrigger>
                <UiDropdownMenuContent class="w-48 rounded-lg" :side="isMobile ? 'bottom' : 'right'"
                  :align="isMobile ? 'end' : 'start'">
                  <UiDropdownMenuItem>
                    <Icon mode="svg" name="lucide:folder" class="text-muted-foreground" />
                    <span>View Project</span>
                  </UiDropdownMenuItem>
                  <UiDropdownMenuItem>
                    <Icon name="lucide:forward" class="text-muted-foreground" />
                    <span>Share Project</span>
                  </UiDropdownMenuItem>
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem>
                    <Icon name="lucide:trash-2" class="text-muted-foreground" />
                    <span>Delete Project</span>
                  </UiDropdownMenuItem>
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </UiSidebarMenuItem>

            <UiSidebarMenuItem>
              <UiSidebarMenuButton class="text-sidebar-foreground/70">
                <Icon name="lucide:ellipsis-vertical" class="rotate-90 text-sidebar-foreground/70" />
                <span>More</span>
              </UiSidebarMenuButton>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarGroup> -->
        <!-- Secondary -->
        <!-- <UiSidebarGroup class="mt-auto">
          <UiSidebarGroupContent>
            <UiSidebarMenu>
              <UiSidebarMenuItem v-for="item in data.navSecondary" :key="item.title">
                <UiSidebarMenuButton as-child size="sm">
                  <NuxtLink :href="item.url">
                    <Icon mode="svg" :name="item.icon" />
                    <span>{{ item.title }}</span>
                  </NuxtLink>
                </UiSidebarMenuButton>
              </UiSidebarMenuItem>
            </UiSidebarMenu>
          </UiSidebarGroupContent>
        </UiSidebarGroup> -->
      </UiSidebarContent>
      <UiSidebarRail />
      <!-- Footer-->
      <UiSidebarFooter>
        <UiSidebarMenu>
          <UiSidebarMenuItem>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiSidebarMenuButton size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <UiAvatar class="size-8 rounded-lg">
                    <UiAvatarFallback class="rounded-lg">{{ (currentUser.name || '').substring(0, 2).toUpperCase() }}
                    </UiAvatarFallback>
                  </UiAvatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{ currentUser.name }}</span>
                    <span class="truncate text-xs">{{ currentUser.email }}</span>
                  </div>
                  <Icon name="lucide:chevrons-up-down" class="ml-auto size-4" />
                </UiSidebarMenuButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                :side="isMobile ? 'bottom' : 'right'" :side-offset="4" align="end">
                <!-- <UiDropdownMenuLabel class="p-0 font-normal">
                  <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UiAvatar class="size-8 rounded-lg">
                      <UiAvatarImage :src="data.user.avatar" :alt="data.user.name" />
                      <UiAvatarFallback class="rounded-lg">BB</UiAvatarFallback>
                    </UiAvatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">{{ data.user.name }}</span>
                      <span class="truncate text-xs">{{ data.user.email }}</span>
                    </div>
                  </div>
                </UiDropdownMenuLabel>
                <UiDropdownMenuSeparator /> -->
                <UiDropdownMenuGroup>
                  <NuxtLink :to="`#`"
                    @click.prevent="handleNavigate('/about', isMobile, setOpenMobile)"
                    cursor="pointer">
                    <UiDropdownMenuItem icon="lucide:info" title="Thông tin" />
                  </NuxtLink>
                  <NuxtLink :to="`#`"
                    @click.prevent="handleNavigate('/profile/change-password', isMobile, setOpenMobile)"
                    cursor="pointer">
                    <UiDropdownMenuItem icon="lucide:lock" title="Đổi mật khẩu" />
                  </NuxtLink>
                </UiDropdownMenuGroup>
                <UiDropdownMenuSeparator />
                <!-- <UiDropdownMenuGroup>
                  <UiDropdownMenuItem icon="lucide:badge-check" title="Account" />
                  <UiDropdownMenuItem icon="lucide:credit-card" title="Billing" />
                  <UiDropdownMenuItem icon="lucide:settings-2" title="Settings" />
                  <UiDropdownMenuItem icon="lucide:bell" title="Notifications" />
                </UiDropdownMenuGroup>
                <UiDropdownMenuSeparator /> -->
                <UiDropdownMenuItem icon="lucide:log-out" title="Log out" @click.prevent="handleLogout" />
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiSidebarMenuItem>
        </UiSidebarMenu>
      </UiSidebarFooter>
    </UiSidebar>
    <!-- Sidebar main content -->
    <UiSidebarInset>
      <!-- Navbar -->
      <UiNavbar sticky class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <UiSidebarTrigger class="-ml-1" />
        <UiSeparator orientation="vertical" class="mr-2 h-4" />
        <UiBreadcrumbs :items="breadcrumbItems" />
      </UiNavbar>
      <div class="p-4">
        <slot />
      </div>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>

<script lang="js" setup>
import { useAuthStore } from "@/stores/authStore";
import { useAppPageStore } from "@/stores/appPageStore";

const appPageStore = useAppPageStore();
const authStore = useAuthStore();

const { breadcrumbItems } = storeToRefs(appPageStore);
const { currentUser } = storeToRefs(authStore);
// // Breadcrumb items
// const breadcrumbItems = [
//   { label: "Building Your Application", link: "#" },
//   { label: "Data Fetching", link: "#" },
// ];
// This is sample data.
const data = {
  user: {
    name: "breezy",
    email: "m@example.com",
    avatar: "https://behonbaker.com/icon.png",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: "lucide:gallery-vertical-end",
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: "lucide:audio-waveform",
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: "lucide:command",
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Danh sách lớp",
      url: "/units",
      icon: "lucide:book-open",
      isActive: true
    },
    {
      title: "Điểm danh",
      url: "/attendances",
      icon: "lucide:check",
      isActive: false
    },
    {
      title: "Điểm kiểm tra",
      url: "/testscores",
      icon: "lucide:file-check",
      isActive: false
    }
    // {
    //   title: "Playground",
    //   url: "#",
    //   icon: "lucide:square-terminal",
    //   isActive: true,
    //   items: [
    //     {
    //       title: "History",
    //       url: "#",
    //     },
    //     {
    //       title: "Starred",
    //       url: "#",
    //     },
    //     {
    //       title: "Settings",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Models",
    //   url: "#",
    //   icon: "lucide:bot",
    //   items: [
    //     {
    //       title: "Genesis",
    //       url: "#",
    //     },
    //     {
    //       title: "Explorer",
    //       url: "#",
    //     },
    //     {
    //       title: "Quantum",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: "lucide:book-open",
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: "lucide:settings-2",
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  projects: [
    // {
    //   name: "Design Engineering",
    //   url: "#",
    //   icon: "lucide:frame",
    // },
    // {
    //   name: "Sales & Marketing",
    //   url: "#",
    //   icon: "lucide:pie-chart",
    // },
    // {
    //   name: "Travel",
    //   url: "#",
    //   icon: "lucide:map",
    // },
  ],
  navSecondary: [
    // {
    //   title: "Support",
    //   url: "#",
    //   icon: "lucide:life-buoy",
    // },
    // {
    //   title: "Feedback",
    //   url: "#",
    //   icon: "lucide:send",
    // },
  ],
};
const activeTeam = ref(data.teams[1]);

const handleLogout = async () => {
  const result = await authStore.logoutUser();
  if (result) {
    navigateTo("/auth/login");
  }
}

const handleNavigate = async (url, isMobile, setOpenMobile) => {
  await navigateTo(url);
  if (isMobile) {
    setOpenMobile(false);
  }
}
</script>