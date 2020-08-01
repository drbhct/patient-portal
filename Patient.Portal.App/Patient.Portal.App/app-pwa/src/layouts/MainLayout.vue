<template>
  <div class="inner-wrapper">
    <!-- start: sidebar -->
    <aside id="sidebar-left" class="sidebar-left">
      <div class="sidebar-header">
        <div class="sidebar-title">Menu</div>
        <!-- <div class="sidebar-toggle d-none d-md-block" data-toggle-class="sidebar-left-collapsed" data-target="html" data-fire-event="sidebar-left-toggle">
              <i class="fas fa-bars" aria-label="Toggle sidebar"></i>
        </div>-->
      </div>
      <div class="nano">
        <div class="nano-content">
          <nav id="menu" class="nav-main" role="navigation">
            <ul class="nav nav-main">
              <!-- temporary hide for layout showcase -->
              <!-- <li>
                <a class="nav-link" href="layouts-default.html">
                  <i class="far fa-comment" aria-hidden="true"></i>
                  <span>Messages</span>
                </a>
              </li>-->
              <li>
                <a class="nav-link" href="layouts-default.html">
                  <i class="fas fa-file" aria-hidden="true"></i>
                  <span>Documents</span>
                </a>
              </li>
              <li>
                <a class="nav-link" href="layouts-default.html">
                  <i class="far fa-calendar" aria-hidden="true"></i>
                  <span>Appointments</span>
                </a>
              </li>
              <li>
                <a class="nav-link" href="layouts-default.html">
                  <i class="fas fa-dollar-sign" aria-hidden="true"></i>
                  <span>Billing</span>
                </a>
              </li>
              <li>
                <a class="nav-link" href="layouts-default.html">
                  <i class="fas fa-user" aria-hidden="true"></i>
                  <span>Profile</span>
                </a>
              </li>
              <li>
                <a class="nav-link" href="layouts-default.html">
                  <i class="fas fa-tasks" aria-hidden="true"></i>
                  <span>Tasks</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
    <!-- end: sidebar -->

    <section role="main" class="content-body">
      <!-- start: page -->
      <router-view></router-view>
      <!-- end: page -->
    </section>
  </div>
</template>
