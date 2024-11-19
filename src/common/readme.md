# Common

The `common` path contains a mirror of shared code from the API the client app
needs. Code under `@common` must not be modified since the source of truth is
the backend code and this is just a mirror.

The only exception to modify the common code is when removing parts the client
won't use and disable frontend TS lints, if needed. You might need to export 
certain member, too.

If the application grows as a system, this code should become a library.
